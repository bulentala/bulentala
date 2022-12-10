"use client";
import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import tinymce from "tinymce";

const MyPage = () => {
  useEffect(() => {
    tinymce.init({
      selector: "#mytextarea",
    });
  }, []);

  return (
    <div>
      <Head>
        <Script
          src='https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js'
          referrerPolicy='origin'
        ></Script>
      </Head>
      <textarea id='mytextarea'></textarea>

      {tinymce.init({
        selector: "#mytextarea",
      })}
    </div>
  );
};

export default MyPage;
