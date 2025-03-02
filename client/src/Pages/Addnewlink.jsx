import React, { useRef, useState } from "react";
import styles from "../PageStyles/addnewlink.module.css";
import { IoIosLink } from "react-icons/io";
import { BsShop } from "react-icons/bs";
import { LuCopy } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import youtube from "../assets/media/youtube.png";
import instagram from "../assets/media/instagram.png";
import facebook from "../assets/media/facebook.png";
import twitter from "../assets/media/Xlogo.png";

const Addnewlink = ({
  onClose,
  isAddlinkShow,
  title,
  setTitle,
  url,

  setShopLinkUrl,
  showShop,
  setshowShop,
  handelShopLink
}) => {
  const modelRef = useRef();
  const closeModel = (e) => {
    if (modelRef.current === e.target) {
      onClose();
      handeladdLink();
      handelShopLink();
    }
  };

  const [isAddlink, setIsAddlink] = useState(isAddlinkShow);

  const Appobj = [
    { src: instagram, name: "Instagram" },
    { src: facebook, name: "Facebook" },
    { src: youtube, name: "YouTube" },
    { src: twitter, name: "Twitter" },
  ];

  // console.log(selectedApp);

  return (
    <div className={styles.main} ref={modelRef} onClick={closeModel}>
      <div className={styles.container}>
        <div className={styles.AddLinks}>
          <div>
            <button
              className={isAddlink ? styles.AddLinkTrue : styles.AddLinkFalse}
              onClick={() => setIsAddlink(true)}
            >
        
            </button>
          </div>
        </div>
        {isAddlink ? (
          <div className={styles.UrlContainer}>
            <h3>Enter URL</h3>
            <div className={styles.linkTitle}>
              <input
                type="text"
                placeholder="Link title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                typp(!showToapp)}
              ></label>
            </div>
            <div className={styles.linkTitle}>
              <input
                type="text"
                placeholder="Link Url"
                value={url}
             applications}>
              <h3>Applications</h3>
              <div className={styles.appContainers}>
                {Appobj.map((item, index) => (
                  <d
          </div>
        ) : (
          <div className={styles.ShopContainer}>
            <h3>Enter URL</h3>
            <div className={styles.linkTitle}>
              <input
                type="text"
                placeholder="Link title"
                value={ShopTitle}
                onChange={(e) => setShopTitle(e.target.value)}
              />
              <input
                type="checkbox"
                name="checkbox"
                id="toggle"
                checked={showShop}
              />
              <label
                htmlFor="toggle"
                className={styles.switch}
                onClick={() => setshowShop(!showShop)}
              ></label>
            </div>
            <div className={styles.linkTitle}>
              <input
                type="text"
                placeholder="ShopUrl"
                value={ShopUrl}
                onChange={(e) => setShopLinkUrl(e.target.value)}
              />
              <button>
                <LuCopy />
       
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Addnewlink;
