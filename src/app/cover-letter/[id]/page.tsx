export default function CoverLetterEditorPage({ 
  params, 
  searchParams 
}: { 
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Cover Letter Editor</h1>
      <p className="text-muted-foreground mb-8">Editing Cover Letter ID: {params.id}</p>
      
      <div className="p-8 bg-card border rounded-lg min-h-[500px]">
        {/* Cover letter editor form */}
        <p className="text-muted-foreground">Cover letter generation tools will go here.</p>
      </div>
    </div>
  );
}
