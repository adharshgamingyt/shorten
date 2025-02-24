import Link from "next/link";
import { useRouter } from "next/router";

import { db } from "@/lib/prisma";

const toUrlPage = async () => {
  const router = useRouter();

  return <div>hlo redirecting to : {router.query.slug}</div>;
};

export default toUrlPage;
