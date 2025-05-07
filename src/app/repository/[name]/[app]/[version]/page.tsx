"use client";
import { useParams } from "next/navigation";

const InstallAppPage = () => {
  const { name, app, version } = useParams();

  console.log(name, app, version);
  return <div>page</div>;
};
export default InstallAppPage;
