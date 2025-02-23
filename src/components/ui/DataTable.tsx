import { DataGrid, GridColDef, GridCellParams, GridPaginationModel } from "@mui/x-data-grid";
import { useState, useEffect, useCallback } from "react";
import { TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const generateData = () => {
  const today = new Date();
  return [
    { id: 1, category: "Monthly Revenue", amount: "$4,196", previousMonth: "$3.1K", change: "84%", date: new Date(today) },
    { id: 2, category: "Monthly Sales", amount: "$2,098", previousMonth: "$3.1K", change: "70%", date: new Date(today.setDate(today.getDate() - 3)) },
    { id: 3, category: "Total Profit", amount: "$10,191", previousMonth: "$9.5K", change: "85%", date: new Date(today.setDate(today.getDate() - 10)) },
    { id: 4, category: "Active Users", amount: "32,984", previousMonth: "30,500", change: "+23%", date: new Date(today.setDate(today.getDate() - 20)) },
    { id: 5, category: "Total Clicks", amount: "2.42M", previousMonth: "2.1M", change: "+15%", date: new Date(today.setDate(today.getDate() - 35)) },
    { id: 6, category: "Total Sales", amount: "$2,400", previousMonth: "$2,000", change: "+20%", date: new Date(today.setDate(today.getDate() - 50)) },
    { id: 7, category: "Total Items Sold", amount: "320", previousMonth: "280", change: "+14%", date: new Date(today.setDate(today.getDate() - 100)) },
  ];
};

const columns: GridColDef[] = [
  { field: "category", headerName: "Category", flex: 1, minWidth: 200 },
  { field: "amount", headerName: "Amount", flex: 1, minWidth: 150 },
  { field: "previousMonth", headerName: "Previous Month", flex: 1, minWidth: 150 },
  {
    field: "change",
    headerName: "Change",
    flex: 1,
    minWidth: 120,
    cellClassName: (params: GridCellParams) =>
      String(params.value).includes("+") ? "text-green-500 font-bold" : "text-red-500 font-bold",
  },
];

const FinancialDataTable = () => {
  const [filterText, setFilterText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [filteredData, setFilteredData] = useState(generateData());
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  // ✅ Filtering function based on selected date range
  const getFilteredByDate = useCallback((data: typeof filteredData, filter: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return data.filter((item) => {
      const itemDate = new Date(item.date);
      itemDate.setHours(0, 0, 0, 0);

      switch (filter) {
        case "Last 7 Days":
          const last7Days = new Date();
          last7Days.setDate(today.getDate() - 7);
          return itemDate >= last7Days;
        case "Last 30 Days":
          const last30Days = new Date();
          last30Days.setDate(today.getDate() - 30);
          return itemDate >= last30Days;
        case "This Year":
          return itemDate.getFullYear() === today.getFullYear();
        case "All":
          return true;
        default:
          return true;
      }
    });
  }, []);
  useEffect(() => {
    const data = generateData();
    const filteredByDate = getFilteredByDate(data, selectedMonth);
    const finalFiltered = filteredByDate.filter((item) =>
      item.category.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredData(finalFiltered);
  }, [selectedMonth, filterText, getFilteredByDate]);

  return (
    <div className="w-full ">
      <h5 className="text-white font-bold mb-4 text-xl sm:text-2xl">
        Financial Summary
      </h5>

  <div className="flex flex-col sm:flex-row gap-5 sm:gap-4 mb-4 sm:justify-between">
  <TextField
  placeholder="Search by category"
  variant="outlined"
  value={filterText}
  onChange={(e) => setFilterText(e.target.value)}
  className="w-full sm:w-48"
  sx={{
    '& .MuiOutlinedInput-root': {
      borderRadius: "19px",
      height: "40px",
      backgroundColor: '#1E293B',
      color: 'white',
      display: "flex",
      alignItems: "center",
    },
    '& input': {
      color: "white",
      paddingLeft: "12px", 
    },
  }}
/>

    <FormControl className="w-full  sm:w-48">
    <InputLabel sx={{ color: "white" }}>Filter by Time</InputLabel>
      <Select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        sx={{
          borderRadius: "19px", 
          height: "40px", 
          backgroundColor: '#1E293B',
          color: 'white',
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "grey" },
          "&:hover .MuiOutlinedInput-notchedOutline": { },
        }}
      >
        <MenuItem value="All">All Time</MenuItem>
        <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
        <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
        <MenuItem value="This Year">This Year</MenuItem>
      </Select>
    </FormControl>
  </div>

      {/* Data Table Container */}
      <div className="  w-full overflow-auto">
      <DataGrid
  rows={filteredData}
  columns={columns}
  pagination
  paginationModel={paginationModel}
  onPaginationModelChange={setPaginationModel}
  pageSizeOptions={[5, 10, 20]}
  columnHeaderHeight={50}
  sx={{
    minWidth: 300,
    color: "#fff",
    borderRadius: 4,
    borderColor: "#3A3D4E",
    '& .MuiDataGrid-footerContainer': { borderTop: 'none' },
    '& .MuiDataGrid-columnHeader': { 
      backgroundColor: "#3A3D4E",
      borderBottom: "0.1px solid #fff",
    },
    '& .MuiDataGrid-menuIconButton': { 
      color: "#fff !important" 
    },
    '& .MuiDataGrid-columnHeaderTitle': { 
      color: "#fff",
      fontWeight: "bold",
      fontSize: "16px",
    },
    '& .MuiDataGrid-cell': { border: "none" },
    '& .MuiTablePagination-root': { color: "#fff" },
    '& .MuiDataGrid-row:hover': { backgroundColor: "#374151" },
    '& .MuiDataGrid-sortIcon': { color: "#fff" },
  }}
/>

      </div>
    </div>
  );
};

export default FinancialDataTable;