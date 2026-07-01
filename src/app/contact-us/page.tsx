import type { Metadata } from "next";
import { GlobalPageBanner } from "@/components/common/GlobalPageBanner";
import { ContactUsView } from "@/components/contact/ContactUsView";
import { contactPageBanner } from "@/data/site-static";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach Nourbelle Tours by phone, email, or message — our Egypt travel experts help you plan custom tours and answer your questions.",
};

export default function ContactUsPage() {
  return (
    <>
      <GlobalPageBanner {...contactPageBanner} />
      <ContactUsView />
    </>
  );
}
