export default function ResumeEditorPage({ 
  params, 
  searchParams 
}: { 
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="flex h-[calc(100vh-73px)]">
      <div className="w-1/2 border-r p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Resume Editor</h2>
        <p className="text-muted-foreground">Editing Resume ID: {params.id}</p>
        {/* Editor component will go here */}
      </div>
      <div className="w-1/2 p-6 bg-accent/5 overflow-y-auto flex items-center justify-center">
        <div className="bg-white w-[8.5in] h-[11in] shadow-lg rounded-sm flex items-center justify-center text-muted-foreground">
          Live Preview
        </div>
      </div>
    </div>
  );
}
