import { db } from "@/lib/db";

export async function syncJobs(location: string = "india", role: string = "developer") {
  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
  if (!RAPIDAPI_KEY) {
    console.error("RAPIDAPI_KEY is missing");
    return;
  }

  const query = encodeURIComponent(`${role} jobs in ${location}`);
  const url = `https://jsearch.p.rapidapi.com/search?query=${query}&page=1&num_pages=1`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch from JSearch");
    }

    const externalJobs = data.data || [];

    // Upsert jobs into database
    const upsertPromises = externalJobs.map((job: any) => {
      return db.job.upsert({
        where: { applyUrl: job.job_apply_link },
        update: {
          title: job.job_title,
          company: job.employer_name,
          location: job.job_city ? `${job.job_city}, ${job.job_country}` : job.job_country,
          updatedAt: new Date(),
        },
        create: {
          title: job.job_title,
          company: job.employer_name,
          location: job.job_city ? `${job.job_city}, ${job.job_country}` : job.job_country,
          applyUrl: job.job_apply_link,
          source: "JSearch",
        },
      });
    });

    await Promise.all(upsertPromises);
    console.log(`Successfully synced ${externalJobs.length} jobs.`);
    return externalJobs.length;
  } catch (error) {
    console.error("Sync Jobs Error:", error);
    throw error;
  }
}
