import React from "react";
import FAQItem from "./FAQItem";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">General</h2>
        <div className="border rounded-md">
          <FAQItem
            question="Do we have international Shipping?"
            answer="No, our furniture store does not currently offer international shipping"
          />
          <FAQItem
            question="Do you offer replacement parts?"
            answer="For most furniture we offer replacement parts. Reach out to us on the About Us page for more information."
          />
          <FAQItem
            question="What is your online return policy?"
            answer="We do not accept returns of products bought online."
          />
          <FAQItem
            question="How do I place an order?"
            answer="Find the item you are looking for and add it to your cart. Then use the cart tab located at the top right of the screen to continue your order."
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Purchases</h2>
        <div className="border rounded-md">
          <FAQItem
            question="What delivery methods do you offer?"
            answer="We offer standard delivery."
          />
          <FAQItem
            question="What type of payment methods do you accept?"
            answer="We accept debit and credit card purchases."
          />
          <FAQItem
            question="Is it safe to enter my credit card information on your site?"
            answer="Yes, it is completely safe to enter your credit card information. (In reality this is a school project do not enter real credit/debit card information)"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Account</h2>
        <div className="border rounded-md">
          <FAQItem
            question="How do I create an account?"
            answer="Please use the account tab located in the top right corner of the screen."
          />
          <FAQItem
            question="What are the requirements for the account password?"
            answer="The password must be at least 8 charaters long."
          />
          <FAQItem
            question="How do I log into my account?"
            answer="Please use the account tab located in the top right corner of the screen."
          />
        </div>
      </section>

      <p className="mt-8 text-center text-gray-700">
        More Questions? Reach out to us on our{" "}
        <Link to="/contactus" className="text-blue-600 underline">
          Contact Us Page
        </Link>
      </p>
    </div>
  );
};

export default FAQ;
