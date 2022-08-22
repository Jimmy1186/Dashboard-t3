import React from 'react'
import { readFile, set_fs, utils } from 'xlsx';
import { join } from 'path';
import { cwd } from 'process';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'






function index() {



  return (
    <>
   <div className="tableWrapper">

 </div>
    </>
  )
}

export default index



export async function getServerSideProps() {
   await import("fs")
    const wb = readFile(join(cwd(), "src/sheets/01.xlsx"))
    console.log(wb)
    return {
      props: {
        type: "getServerSideProps",
        
      },
    }
  }