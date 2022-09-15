import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { Button } from "@mui/material";
import { MRT_Row } from "material-react-table";
import { tl } from "../../types/task";
import { trpc } from "../../utils/trpc";

type downloadXlsxBtnType = {
  clickableState: boolean;
  rowValue: any;
  profit:Array<number>|undefined;
  cost:Array<number>|undefined;
  outbound:Array<number>|undefined;
};

function DownloadXlsx({ clickableState, rowValue,profit,cost,outbound }: downloadXlsxBtnType) {
  const xlsxMutation = trpc.useMutation(["guest.xlsx"]);

  const onDownload = React.useCallback(
    (xlsxData:any,
    p:Array<number>|undefined,
    c:Array<number>|undefined,
    o:Array<number>|undefined,
    i:Array<number>|undefined,) => {
        
    xlsxMutation.mutate({
      xlsx:xlsxData
    });
  }, [xlsxMutation]);

  const handleExportRows = (rows: MRT_Row<tl>[]) => {
    const kk = profit?.filter((_v,i,_a)=>{
        const y =rows.map(v=> Number(v.id))
       return y.some(j=>i===j)
    })
    
    console.log(rows.map(v=> Number(v.id)))
    console.log(profit)
    console.log(kk)
    // onDownload(
    //     rows.map(i=>i.original),
    //     profit,
    //     cost,
    //     outbound,
    //     rows.map(i=>Number(i.id))
    // )
  };

  return (
    <Button
      disabled={!clickableState && !clickableState}
      startIcon={<DownloadIcon />}
      onClick={() => handleExportRows(rowValue)}
      variant="contained"
    >
      下載
    </Button>
  );
}

export default DownloadXlsx;
