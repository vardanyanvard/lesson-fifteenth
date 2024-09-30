import { useOutletContext } from "react-router-dom";
import EditLogin from "../../../components/EditLogin";
import { EditPassword } from "../../../components/EditPssword";
import { handleChangeStatus } from "../../../lib/api";
import { IContextType } from "../../../lib/types";

function Settings() {
  const { account, setAccount } = useOutletContext<IContextType>();

  const changeStatus = () => {
    handleChangeStatus().then(({ payload }) => {
      setAccount({ ...account, isPrivate: payload as number });
    });
  };

  return (
    <div className="settingsContent">
      <EditPassword />
      <EditLogin />
      <div className="accountStatus">
        Account status:
        <div onClick={changeStatus}>
          <img
            src={
              account.isPrivate
                ? "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678129-lock-256.png"
                : "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678115-lock-open-256.png"
            }
            alt="lock"
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
