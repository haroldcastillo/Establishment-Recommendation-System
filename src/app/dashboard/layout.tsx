
import Header from "../layout/header";
import Footer from "../layout/footer";
export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <div className="grow mt-[72px]">
        {children}
      </div>
      <Footer />
    </div>
  );
}
