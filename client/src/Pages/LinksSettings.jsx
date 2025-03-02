import React, { useState } from "react";
import styles from "../PageStyles/dashboard.module.css";
import { IoIosLink } from "react-icons/io";
import { BsShop } from "react-icons/bs";
import { IoAddSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbAntennaBars5 } from "react-icons/tb";

const LinksSettings = ({
  profileImage,
  handlePickImage,
  handleFileChange,

  bannerColor,
  setBannerColor,
  // inputColor,
  // setInputColor,
  fileInputRef,
  showToapp,
  setShowToapp,
  showShop,
  setshowShop,
  linksArr,
  setLinksArr,
  shopArr,
  setShopArr,
}) => {

  
  const handleToggle = (index) => {
    setLinksArr((prevLinks) =>
      prevLinks.map((item, i) =>
        i === index ? { ...item, showToapp: !item.showToapp } : item
      )
    );
  };
  const handleShopToggle = (index) => {
    setShopArr((prevLinks) =>
      prevLinks.map((item, i) =>
        i === index ? { ...item, showShop: !item.showShop } : item
      )
    );
  };

  const handelDleLinkArr = (index) => {
    setLinksArr((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };

  const handleDleShoparr = (index) => {
    setShopArr((prevShops) => prevShops.filter((_, i) => i !== index));
  };

  const [inputColor, setInputColor] = useState("#000");

  return (
    <>
      {/* Profile photo username settings */}
      <div className={styles.profileCont}>
        <h2>Profile</h2>
        <div className={styles.profileSetting}>
          <div className={styles.UploadProfileImg}>
            <div className={styles.imgaePrev}>
        
              <input
                type="text"
                name="Username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.profileTitle}>
              <p>Bio</p>
              <textarea
                rows="3"
                cols="90"
                value={userBio}
         
          </button>
          <button
            className={isAddlink ? styles.AddLinkFalse : styles.AddLinkTrue}
            onClick={() => setIsAddlink(false)}
          >
            <BsShop size={18} />
            Add Shop
          </button>
        </div>
        <button
          className={styles.AddLinksBtn}
          onClick={() => setShowAddModel(true)}
        >
          <IoAddSharp /> Add
        </button>
        <div className={styles.linksContainer}>
          {isAddlink
            ? linksArr &&
              linksArr.map((item, index) => (
                <div className={styles.aloneLinks} key={index}>
                  <div className={styles.linksData}>
         
                      id={`toggle-${index}`}
                      checked={item.showToapp}
                      onChange={() => handleToggle(index)}
                    />
                    <label
                      htmlFor={`toggle-${index}`}
                      className={styles.switch}
                      // onClick={() => setShowToapp(!item.showToapp)}
                    ></label>
                    <button className={styles.linkarrdDltBnts} onClick={() => handelDleLinkArr(index)}>
                        <RiDeleteBin6Line size={18} color="#9EA099" />
                    </button>
                  </div>
                </div>
              ))
            : shopArr &&
              shopArr.map((item, index) => (
                <div className={styles.aloneLinks} key={index}>
                  <div className={styles.linksData}>
                    <h2>{item.ShopTitle}</h2>
                    <p className={styles.urlpara}>{item.ShopUrl}</p>
                    <p className={styles.clickspara}>
                      <TbAntennaBars5 size={20} /> {item.shopCount} clicks
                    </p>
                  </div>
                  <div className={styles.linkCtrls}>
                    <input
                      type="checkbox"
                      name={`showShop-${index}`}
                      id={`toggle-${index}`}
                      checked={item.showShop}
                      onChange={() => handleShopToggle(index)}
                    />
                    <label
                      htmlFor={`toggle-${index}`}
                      className={styles.switch}
                      // onClick={() => setShowToapp(!item.showToapp)}
                    ></label>
                    <button className={styles.linkarrdDltBnts} onClick={() => handleDleShoparr(index)}>
                        <RiDeleteBin6Line size={18} color="#9EA099" />
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* banner */}
      <div className={styles.profileCont}>
        <h2>Banner</h2>
        <div className={styles.bannerEdit}>
          <div
            className={styles.bannerPreview}
            style={{ backgroundColor: `${bannerColor}` }}
          >
            <div>
              <img src={profileImage} />
            </div>
            <h3>{Username}</h3>
          </div>
          <div className={styles.customColorsDiv}>
            <p>Custom Background Color</p>
            <div className={styles.customColors}>
              <div onClick={() => setBannerColor("#342B26")}></div>
              <div onClick={() => setBannerColor("#fff")}></div>
              <div onClick={() => setBannerColor("#000000")}></div>
            </div>
            <div className={styles.uniqueColors}>
              <div
                className={styles.uniqColor}
                style={{ backgroundColor: `${inputColor}` }}
                onClick={() => setBannerColor(inputColor)}
              ></div>
              <input
                type="text"
                placeholder="#000"
                onChange={(e) => setInputColor(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinksSettings;
