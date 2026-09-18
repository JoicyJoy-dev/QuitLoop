import { CookieBanner } from "@/components/site/CookieBanner";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SosProvider } from "@/components/site/SosContext";
import { UrgeSurfingModal } from "@/components/site/UrgeSurfingModal";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <SosProvider>
      <Header />
      <main className="flex-1 bg-background pt-20">{children}</main>
      <Footer />
      <UrgeSurfingModal />
      <CookieBanner />
    </SosProvider>
  );
}
