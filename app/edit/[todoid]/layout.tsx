import { Metadata } from "next";
import "../../globals.css";

type Props = {
  params: { todoid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const todoId = params.todoid;

  return {
    title: `Todo - ${todoId}`,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="container mx-auto">{children}</main>;
}
