import { Button, Heading } from "@medusajs/ui";
import InteractiveLink from "@modules/common/components/interactive-link";
import { Github } from "@medusajs/icons";
import HeadingPage from "../components/headingpage"; 
import SecondPage from "../components/secondpage"
import ThirdPage from "../components/thirdpage";


const ContactTemplate = () => {
  return (
    <div className="h-auto w-full border-b border-ui-border-base relative flex flex-col " style={{ fontFamily: "Warnock Pro Display",background: "#F5F6FA" }}>
     <HeadingPage />
     <SecondPage />
     <ThirdPage />
    </div>
  );
};

export default ContactTemplate;
