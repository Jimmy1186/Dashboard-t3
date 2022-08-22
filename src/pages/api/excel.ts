import type { NextApiRequest, NextApiResponse } from 'next'
import XLSX from 'xlsx';


export default (req: NextApiRequest, res: NextApiResponse) => {

    const workbook = XLSX.readFile("../../docs/01.xlsx");
  res.status(200).json({ name: 'John Doe' })
}