import React from 'react';
export default function Table({ id, ds }) {
  let columns = ['Name', 'Value'];
  let rows = [];
  if (Array.isArray(ds.series)) {
    columns = ['', ...ds.categories];
    rows = ds.series.map((serie) => {
      const { name = '', data = [] } = serie;
      return [name, ...data];
    });
  } else {
    rows = ds.series.data.map(({ name, value }) => [name, value]);
  }

  return (
    <table className="table table-hover table-bordered">
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th scope="col" key={`${id}-th_` + i}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, ii) => (
          <tr key={`${id}-tr_` + ii}>
            {r.map((v, iii) => {
              if (iii === 0) {
                return (
                  <th scope="row" key={`${id}-r-th_` + iii}>
                    {v}
                  </th>
                );
              } else {
                return (
                  <td scope="row" key={`${id}-r-td_` + iii}>
                    {v}
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
