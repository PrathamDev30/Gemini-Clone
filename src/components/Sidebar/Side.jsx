import React, { useContext } from "react";
import "./Style.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { Context } from "../../Context/cont";

const Sidebar = () => {
  const [extended, setextended] = useState(false);
  const { onsent, prevPromts, setrecentPromt, newchat } = useContext(Context);

  const loadPromt = async (prompt) => {
    setrecentPromt(prompt);
    await onsent(prompt);
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        <img
          className="menu"
          onClick={() => setextended((prev) => !prev)}
          src={assets.menu_icon}
        />
        <div onClick={() => newchat()} className="new-chat">
          <img src={assets.plus_icon} />
          {extended ? <p>New Chat </p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPromts && Array.isArray(prevPromts)
              ? prevPromts.map((item, index) => (
                  <div
                    onClick={() => loadPromt(item)}
                    key={index}
                    className="recent-entry"
                  >
                    <img src={assets.message_icon} />
                    <p>{item.slice(0, 18)}...</p>
                  </div>
                ))
              : null}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottem-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottem-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activities</p> : null}
        </div>
        <div className="bottem-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
