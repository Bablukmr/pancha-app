import MyTablePage from "./Components/myTable";

function TablePage() {
  const columnData = [
    {
      title: "Name",
      id: 1,
      dataToShow: "name",
    },
    {
      title: "Age",
      id: 2,
      dataToShow: "age",
    },
    {
      title: "Roll No",
      id: 3,
      dataToShow: "rollno",
    },
  ];
//   const data = [
//     { xyz: "Bablu Kumar", age: 23, rollno: "01" },
//     { xyz: "Rahul Kumar", age: 20, rollno: "02" },
//     { xyz: "Ram Kumar", age: 18, rollno: "03" },
//     { xyz: "Raju Kumar", age: 22, rollno: "04", action: "edit" },
//     { xyz: "Amit Patel", age: 30, rollno: "05" },
//     { xyz: "Anjali Desai", age: 28, rollno: "06" },
//     { xyz: "Vikas Singh", age: 32, rollno: "07" },
//     { xyz: "Pooja Sharma", age: 26, rollno: "08" },
//     { xyz: "Rahul Kumar", age: 20, rollno: "02" },
//   ];

const data = [
    { name: "Bablu Kumar", age: 23, rollno: "01" },
    { name: "Rahul Kumar", age: 20, rollno: "02" },
    { name: "Ram Kumar", age: 18, rollno: "03" },
    { name: "Raju Kumar", age: 22, rollno: "04", },
    { name: "Amit Patel", age: 30, rollno: "05" },
    { name: "Anjali Desai", age: 28, rollno: "06" },
    { name: "Vikas Singh", age: 32, rollno: "07" },
    { name: "Pooja Sharma", age: 26, rollno: "08" },
    { name: "Rahul Kumar", age: 20, rollno: "02" },
    { name: "Ram Kumar", age: 18, rollno: "03" },
    { name: "Raju Kumar", age: 22, rollno: "04" },
    { name: "Amit Patel", age: 30, rollno: "05" },
    { name: "Anjali Desai", age: 28, rollno: "06" },
    { name: "Vikas Singh", age: 32, rollno: "07" },
    { name: "Ram Kumar", age: 18, rollno: "03" },
    { name: "Amit Patel", age: 30, rollno: "05" },
    { name: "Vikas Singh", age: 32, rollno: "07" },
    { name: "Arjun Gupta", age: 31, rollno: "09" },
    { name: "Pooja Sharma", age: 26, rollno: "08" },
    { name: "Anjali Desai", age: 28, rollno: "06" },
    { name: "Vikas Singh", age: 32, rollno: "07" },
    { name: "Neha Verma", age: 29, rollno: "10" },
    { name: "Bablu Kumar", age: 23, rollno: "01" },
    { name: "Rahul Kumar", age: 20, rollno: "02" },
    { name: "Ram Kumar", age: 18, rollno: "03" },
    { name: "Raju Kumar", age: 22, rollno: "04" },
    { name: "Pooja Sharma", age: 26, rollno: "08" },
    { name: "Rahul Kumar", age: 20, rollno: "02" },
    { name: "Ram Kumar", age: 18, rollno: "03" },
    { name: "Raju Kumar", age: 22, rollno: "04" },
    { name: "Arjun Gupta", age: 31, rollno: "09" },
    { name: "Neha Verma", age: 29, rollno: "10" },
    { name: "Bablu Kumar", age: 23, rollno: "01" },
    { name: "Rahul Kumar", age: 20, rollno: "02" },
    { name: "Ram Kumar", age: 18, rollno: "03" },
    { name: "Raju Kumar", age: 22, rollno: "04" },
    { name: "Amit Patel", age: 30, rollno: "05" },
    { name: "Anjali Desai", age: 28, rollno: "06" },
    { name: "Vikas Singh", age: 32, rollno: "07" },
    { name: "Pooja Sharma", age: 26, rollno: "08" },
  ];

  return (
    <>
      <MyTablePage data={data} columnData={columnData} />
    </>
  );
}

export default TablePage;


