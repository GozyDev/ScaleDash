import NewProjectModal from "@/components/NewProjectModal";

const NewProjectpage = async ({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) => {
  const { orgId } = await params;

  return (
    <div>
      <NewProjectModal orgId={orgId} />
    </div>
  );
};

export default NewProjectpage;
