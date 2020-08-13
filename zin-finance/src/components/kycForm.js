import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getKYCAccessToken,
  SUMSUB_BASE_URL,
} from "../redux/actions/kycActions";
import snsWebSdk from "@sumsub/websdk";
import ReactDOM from "react-dom";

function KYCForm() {
  const userId = useSelector((state) => state.userReducer.user.userName);
  const emailVerified = useSelector((state) => state.userReducer.emailVerified);
  const accessToken = useSelector((state) => state.kycReducer.accessToken);
  const history = useHistory();

  useEffect(() => {
    let iframe = document.querySelector("iframe");
    if (iframe) {
      iframe.style.display = "block";
    }
    return () => {
      iframe = document.querySelector("iframe");
      if (iframe) {
        iframe.style.display = "none";
      }
    };
  }, []);

  useEffect(() => {
    if (!emailVerified) {
      history.push("/kyc-application");
    }
  }, [emailVerified, history]);

  useEffect(() => {
    const iframe = document.querySelector("iframe");
    if (accessToken && !iframe) {
      launchWebSdk(SUMSUB_BASE_URL, "zin-kyc", accessToken, userId);
    }
  }, [accessToken]);

  /**
 * @param apiUrl - 'https://test-api.sumsub.com' (sandbox)
                    or 'https://api.sumsub.com' (production)
 * @param flowName - the flow name chosen at Step 1 (e.g. 'basic-kyc')
 * @param accessToken - access token that you generated on the backend in Step 2
 * @param applicantEmail - applicant email
 * @param applicantPhone - applicant phone, if available
 */
  function launchWebSdk(
    apiUrl,
    flowName,
    accessToken,
    applicantEmail,
    applicantPhone
  ) {
    console.log("accessToken", accessToken);
    let snsWebSdkInstance = snsWebSdk
      .Builder(apiUrl, flowName)
      .withAccessToken(accessToken, async (newAccessTokenCallback) => {
        // Access token expired
        // get a new one and pass it to the callback to re-initiate the WebSDK
        // get a new token from your backend
        getKYCAccessToken("testing123", (newAccessToken) => {
          newAccessTokenCallback(newAccessToken);
        });
      })
      .withConf({
        lang: "en",
        email: applicantEmail,
        applicantPhone: applicantPhone,
        onMessage: (type, payload) => {
          // see below what kind of messages the WebSDK generates
          console.log("WebSDK onMessage", type, payload);
        },
        customCss: "url", // URL to css file in case you need change it dynamically from the code
        // the similar setting at Applicant flow will rewrite customCss
        // you may also use to pass string with plain styles `customCssStr:`
        onError: (error) => {
          console.error("WebSDK onError", error);
        },
      })
      .build();

    // you are ready to go:
    // just launch the WebSDK by providing the container element for it
    snsWebSdkInstance.launch("#page-content");
  }

  return <KYCFormPortal />;
}

function KYCFormPortal(props) {
  return ReactDOM.createPortal(props.children, document.getElementById("root"));
}

export default KYCForm;
