import _ from 'lodash';
import React from 'react';

const renderTable = function(table, onDateChange, editable = false) {
   if (table === 'none') return <div style={{ fontSize: 18, textAlign: 'center' }}>No Drug was selected!</div>;

   return (
      <React.Fragment>
         {renderNote(table)}
         <div class="container-table100 mt-2">
            <div class="wrap-table100">
               <div class="table">
                  {renderTableHeader(table)}
                  {renderTableBody(table, onDateChange, editable)}
               </div>
            </div>
         </div>
      </React.Fragment>
   );
}

const renderTableHeader = function(table) {
   if (table === 'none') return null;

   return (
      <div key="header" class="tableRow header">
         {table.header.map((val, idx) => {
            return <div class="cell">{capitalizeFirstLetter(val)}</div>;
         })}
      </div>
   );
}

const renderTableBody = function(table, onChange, editable = false) {
   if (table === 'none') return null;

   const date = ['d_5', 'd_4', 'd_3', 'd_2', 'd_1', 'd', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6'];

   const body = table.data.map((row, rowIdx) => {
      return (
         <div key={rowIdx} class="tableRow">
            {table.header.map((attr) => {
               const trueAttr = attr === 'date' ? date[rowIdx] : attr;
               return renderBodyCell(attr, row[trueAttr], rowIdx, table.data, onChange, editable);
            })}
         </div>
      );
   });

   return body;
}

const renderNote = function(table) {
   console.log('>>>  RenderNote - table: ', table);
   if (table === 'none' || _.isEmpty(table.note)) {
      return null;
   }

   return (
      <div key="notes" className="pl-2">
         <div className="nurseColor h5" style={{ marginBottom: '.2rem' }}>
            Note:
         </div>
         <ul class="list-group">
            {Object.entries(table.note).map((item) => {
               return (
                  <li class="list-group-item" style={{ border: '', padding: '.25rem .75rem' }}>
                     <div class="d-inline-block mr-sm-2">{item[0]}</div>
                     <div class="d-inline-block" style={{ fontSize: 14 }}>
                        {item[1]}
                     </div>
                  </li>
               );
            })}
         </ul>
      </div>
   );
}

//
const renderBodyCell = function(key, val, rowIdx, data, onChange, editable = false) {
   const trueVal = val !== '' ? val : '--';

   if (key === 'date' && rowIdx === 5 && editable) {
      return (
         <div class="cell" data-title={capitalizeFirstLetter(key)}>
            <input
               type="date"
               id="date_of_procedure"
               className="form-control editTable"
               defaultValue={data[5].d}
               onChange={onChange}
            />
         </div>
      );
   }

   return (
      <div key={`${rowIdx}${key}`} class="cell" data-title={capitalizeFirstLetter(key)}>
         {trueVal}
      </div>
   );
}

//
const capitalizeFirstLetter = function(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

const modules = { 
   renderTable,
   renderTableHeader,
   renderTableBody,
   renderNote,
};

export default modules;
