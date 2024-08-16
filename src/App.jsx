import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./App.css";

function App() {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(20);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  let i = 0;
  useEffect(() => {
    fetch(`http://localhost:3000/machines?page=${currentPage}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data.results);
        setTotalCount(data.total);
        console.log(cars);
      })
      .catch((err) => console.log(err));
  }, [currentPage, limit]);

  function handlePageClick(e) {
    setCurrentPage(e.selected + 1);
  }

  return (
    <div>
      <div className="container mx-auto">
        <table className="table w-full border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300">image</th>
              <th className="border border-slate-300">title</th>
              <th className="border border-slate-300">start production</th>
              <th className="border border-slate-300">class</th>
            </tr>
          </thead>
          <tbody>
            {cars.length > 0 &&
              cars.map((car, index) => {
                return (
                  <tr key={index}>
                    <td className="border border-slate-300">
                      <img src={car.image} width={100} height={100} />
                    </td>
                    <td className="border border-slate-300">{car.title}</td>
                    <td className="border border-slate-300">
                      {car.production}
                    </td>
                    <td className="border border-slate-300">{car.class}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="flex justify-between items-center p-10">
          <ReactPaginate
            className="flex gap-4"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(totalCount / limit)}
            previousLabel="< previous"
            renderOnZeropageCount={null}
          />
          <select
            value={limit}
            onChange={(event) => {
              setLimit(event.target.value);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
