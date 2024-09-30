import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IWideUser } from "../../lib/types";

function Account() {
  const id = useParams().id;

  const [user, setUser] = useState<IWideUser | null>(null);

  console.log(id);

  useEffect(() => {}, [id]);

  return <div>Account</div>;
}

export default Account;
