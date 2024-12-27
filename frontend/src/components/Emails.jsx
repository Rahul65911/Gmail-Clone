import React, { useEffect, useState } from "react";
import Email from "./Email";
import { useSelector } from "react-redux";

const Emails = () => {
  const { emails, sentEmails, emailType, searchText } = useSelector((store) => store.app);
  const [filterEmails, setFilterEmails] = useState(emails);
  const [useEmails, setUseEmails] = useState(emails);

  useEffect(() => {
    if(emailType == 0) {
      setUseEmails(emails);
    } else {
      setUseEmails(sentEmails)
    }
  }, [emailType, sentEmails, emails]);

  useEffect(() => {
    const filteredEmails = useEmails.filter((email) => {
      return (
        email.subject.toLowerCase().includes(searchText.toLowerCase()) ||
        email.to.toLowerCase().includes(searchText.toLowerCase()) ||
        email.message.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setFilterEmails(filteredEmails)
  }, [searchText, useEmails, sentEmails, emails]);

  return (
    <div>
      {filterEmails &&
        filterEmails?.map((email) => {
          return <Email key={email._id} email={email} />;
        })}
    </div>
  );
};

export default Emails;
