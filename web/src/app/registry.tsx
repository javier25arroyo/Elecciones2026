"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  createCache,
  StyleProvider,
  } from "@ant-design/cssinjs";

const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
  const cache = createCache();
  
  useServerInsertedHTML(() => (
    <style
    id="antd"
    dangerouslySetInnerHTML={{ __html: cache.sheet.extract() }}
    />
    ));
    
    return <StyleProvider cache={cache}>{children}</StyleProvider>;
  };
  
  export default StyledComponentsRegistry;
  