import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { Button } from "@mui/material";
import { MRT_Row } from "material-react-table";
import { tl } from "../../types/task";
import { trpc } from "../../utils/trpc";
const mediaType =
  "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";

type downloadXlsxBtnType = {
  clickableState: boolean;
  rowValue: any;
  profit: Array<number> | undefined;
  cost: Array<number> | undefined;
  outbound: Array<number> | undefined;
};

function DownloadXlsx({
  clickableState,
  rowValue,
  profit,
  cost,
  outbound,
}: downloadXlsxBtnType) {
  const xlsxMutation = trpc.useMutation(["guest.xlsx"]);
  // console.log(outbound)
  const onDownload = React.useCallback(
    (
      xlsxData: any,
      p: Array<number> | undefined,
      c: Array<number> | undefined,
      o: Array<number> | undefined
    ) => {
      // console.log(xlsxData)
      xlsxMutation
        .mutateAsync({
          xlsx: xlsxData,
          profit: p,
          cost: c,
          outbound:o
        })
        .then((res) => {
    
          // console.log(res.xlsxPayload[0]===res.xlsxPayload[1]) 
          const link = document.createElement("a");
          link.setAttribute("download", `${xlsxData[0].id}`);
          link.style.display = "none";
          document.body.appendChild(link);
          link.setAttribute("href", `${mediaType}${res.xlsxPayload}`);
          link.click();
      
        });
    },
    [xlsxMutation]
  );

  const handleExportRows = (rows: MRT_Row<tl>[]) => {
    const p = profit?.filter((_v, i, _a) => {
      const y = rows.map((v) => Number(v.id));
      return y.some((j) => i === j);
    });

    const c = cost?.filter((_v, i, _a) => {
      const y = rows.map((v) => Number(v.id));
      return y.some((j) => i === j);
    });

    const o = outbound?.filter((_v, i, _a) => {
      const y = rows.map((v) => Number(v.id));
      return y.some((j) => i === j);
    });

    // console.log(rows.map(v=> Number(v.id)))


    onDownload(
      rows.map((i) => i.original),
      p,
      c,
      o
    );
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
