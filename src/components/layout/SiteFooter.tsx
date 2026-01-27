import Wrapper from "@/components/Wrappers";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <Wrapper as="div" className="flex flex-col gap-3 py-10 text-sm text-zinc-600">
        <p>© {new Date().getFullYear()} TheEmmesGroup</p>
        <p className="max-w-prose">
          Fraud prevention, cyber threat protection, and security solutions to
          safeguard individuals and businesses.
        </p>
      </Wrapper>
    </footer>
  );
}

