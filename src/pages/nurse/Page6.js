import React from 'react';
import { Link } from 'react-router-dom';
import ReactSpinner from 'react-bootstrap-spinner';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import Header from './NurseHeader';
import { domain } from '../../App';
import printJS from 'print-js';

//

let data;
class Page6 extends React.Component {
   constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({
         element: (message, className) => <div className="text-danger">{message}</div>,
      });

      console.log(this.validator);
      this.state = { 
         email: '', 
         loader: '', 
         table: '',
         patient_id: localStorage.getItem('patient_id'),
         
         cell:{
            labVal1: '',
            labVal2: '',
            labVal3: '',
            labVal4: '',
            labVal5: '',
            labVal6: '',
            labVal7: '',
            labVal8: '',
            labVal9: '',
            labVal10: '',
            labVal11: '',

            selectValVka1: '',
            selectValVka2: '',
            selectValVka3: '',
            selectValVka4: '',
            selectValVka5: '',
            selectValVka6: '',
            selectValVka7: '',
            selectValVka8: '',
            selectValVka9: '',
            selectValVka10: '',
            selectValVka11: '',

            InptValVka1: 0,
            InptValVka2: 0,
            InptValVka3: 0,
            InptValVka4: 0,
            InptValVka5: 0,
            InptValVka6: 0,
            InptValVka7: 0,
            InptValVka8: 0,
            InptValVka9: 0,
            InptValVka10: 0,
            InptValVka11: 0,

            selectValAspirin1: '',
            selectValAspirin2: '',
            selectValAspirin3: '',
            selectValAspirin4: '',
            selectValAspirin5: '',
            selectValAspirin6: '',
            selectValAspirin7: '',
            selectValAspirin8: '',
            selectValAspirin9: '',
            selectValAspirin10: '',
            selectValAspirin11: '',

            InptValAspirin1: 0,
            InptValAspirin2: 0,
            InptValAspirin3: 0,
            InptValAspirin4: 0,
            InptValAspirin5: 0,
            InptValAspirin6: 0,
            InptValAspirin7: 0,
            InptValAspirin8: 0,
            InptValAspirin9: 0,
            InptValAspirin10: 0,
            InptValAspirin11: 0,

            selectValIvHeparin1: '',
            selectValIvHeparin2: '',
            selectValIvHeparin3: '',
            selectValIvHeparin4: '',
            selectValIvHeparin5: '',
            selectValIvHeparin6: '',
            selectValIvHeparin7: '',
            selectValIvHeparin8: '',
            selectValIvHeparin9: '',
            selectValIvHeparin10: '',
            selectValIvHeparin11: '',

            InptValIvHeparin1: 0,
            InptValIvHeparin2: 0,
            InptValIvHeparin3: 0,
            InptValIvHeparin4: 0,
            InptValIvHeparin5: 0,
            InptValIvHeparin6: 0,
            InptValIvHeparin7: 0,
            InptValIvHeparin8: 0,
            InptValIvHeparin9: 0,
            InptValIvHeparin10: 0,
            InptValIvHeparin11: 0,

            selectValAntiplatelets1: '',
            selectValAntiplatelets2: '',
            selectValAntiplatelets3: '',
            selectValAntiplatelets4: '',
            selectValAntiplatelets5: '',
            selectValAntiplatelets6: '',
            selectValAntiplatelets7: '',
            selectValAntiplatelets8: '',
            selectValAntiplatelets9: '',
            selectValAntiplatelets10: '',
            selectValAntiplatelets11: '',

            InptValAntiplatelets1: 0,   
            InptValAntiplatelets2: 0,
            InptValAntiplatelets3: 0,
            InptValAntiplatelets4: 0,
            InptValAntiplatelets5: 0,
            InptValAntiplatelets6: 0,
            InptValAntiplatelets7: 0,
            InptValAntiplatelets8: 0,
            InptValAntiplatelets9: 0,
            InptValAntiplatelets10: 0,
            InptValAntiplatelets11: 0,

            selectValAntiplateletsVer21: '',
            selectValAntiplateletsVer22: '',
            selectValAntiplateletsVer23: '',
            selectValAntiplateletsVer24: '',
            selectValAntiplateletsVer25: '',
            selectValAntiplateletsVer26: '',
            selectValAntiplateletsVer27: '',
            selectValAntiplateletsVer28: '',
            selectValAntiplateletsVer29: '',
            selectValAntiplateletsVer210: '',
            selectValAntiplateletsVer211: '',

            InptValAntiplateletsVer21: 0,
            InptValAntiplateletsVer22: 0,
            InptValAntiplateletsVer23: 0,
            InptValAntiplateletsVer24: 0,
            InptValAntiplateletsVer25: 0,
            InptValAntiplateletsVer26: 0,
            InptValAntiplateletsVer27: 0,
            InptValAntiplateletsVer28: 0,
            InptValAntiplateletsVer29: 0,
            InptValAntiplateletsVer210: 0,
            InptValAntiplateletsVer211: 0,

            selectValLmwh1: '',
            selectValLmwh2: '',
            selectValLmwh3: '',
            selectValLmwh4: '',
            selectValLmwh5: '',
            selectValLmwh6: '',
            selectValLmwh7: '',
            selectValLmwh8: '',
            selectValLmwh9: '',
            selectValLmwh10: '',
            selectValLmwh11: '',

            InptValLmwh1: 0,
            InptValLmwh2: 0,
            InptValLmwh3: 0,
            InptValLmwh4: 0,
            InptValLmwh5: 0,
            InptValLmwh6: 0,
            InptValLmwh7: 0,
            InptValLmwh8: 0,
            InptValLmwh9: 0,
            InptValLmwh10: 0,
            InptValLmwh11: 0,
         
            selectValDoac1: '',
            selectValDoac2: '',
            selectValDoac3: '',
            selectValDoac4: '',
            selectValDoac5: '',
            selectValDoac6: '',
            selectValDoac7: '',
            selectValDoac8: '',
            selectValDoac9: '',
            selectValDoac10: '',
            selectValDoac11: '',

            InptValDoac1: 0,
            InptValDoac2: 0,
            InptValDoac3: 0,
            InptValDoac4: 0,
            InptValDoac5: 0,
            InptValDoac6: 0,
            InptValDoac7: 0,
            InptValDoac8: 0,
            InptValDoac9: 0,
            InptValDoac10: 0,
            InptValDoac11: 0,
         },
         vka_chkBox: false,
         doac_chkBox: false,
         antiplatelets_chkBox: false,
         lmwh_chkBox: false,
         aspirin_chkBox: false,
         iv_heparin_chkBox: false,
         activeVKA: '',
         activeDOAC: '',
         activeLMWH: '',
         recom_id: '',
      };
      this.print = this.print.bind(this);
      this.submitForm = this.submitForm.bind(this);
   }

   async componentDidMount() {
      if(this.props.location.state !== undefined) {
         this.setState({ recom_id: this.props.location.state.recommendation_id });
      }
      console.log('recommendations', this.props.location);
      const headers = {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      };

      try {
         let patient_id = localStorage.getItem('patient_id');
         axios
            .get(domain + `/api/nurse/getRecommendations/:${patient_id}`, {
               headers: headers,
            })
            .then((response) => {
               console.log('Nurse6 - res: ', response);
               if (response.data.success === 'not_found') {
                  this.setState({ table: undefined });
                  return;
               }

               let recm_indx = response.data.success.findIndex(x => x.id === this.state.recom_id);
               data = recm_indx !== -1 ? response.data.success[recm_indx] : response.data.success.find(x => x.last_modified === new Date().toLocaleDateString());
               console.log('NURSE 6 - Response: ', JSON.parse(data.jsonTable), this.props.location, recm_indx, response.data.success[recm_indx]);
               this.setState({ loader: '' });
               this.getDatafromAlgo(JSON.parse(data.jsonTable).table, data, JSON.parse(data.jsonTable).cell);
            });
      } catch (error) {
         console.error(error);
         this.setState({ loader: '' });
      }
   }

   getDatafromAlgo(tableValue, respData, cellData) {
      let table_data = {
         vka: '',
         lmwh: '',
         antiplatelets: '',
         doac: '',
         aspirin: '',
         iv_heparin: '',
         headers: '',
         date: tableValue.date
      };

      const tableData = tableValue;
      let tableHeader = [];
      if(tableData.vka !== '') {
         table_data.vka = tableData.vka;
      }

      if(tableData.lmwh !== '') {
         table_data.lmwh = tableData.lmwh;
      }

      if(tableData.doac !== '') {
            table_data.doac = tableData.doac;
      }

      if(tableData.antiplatelets !== '') {
         table_data.antiplatelets = tableData.antiplatelets;
      }

      if(tableData.aspirin !== '') {
         tableHeader.push({ 'aspirin': tableData.aspirin.header });
         table_data.aspirin = tableData.aspirin;
      }

      if(tableData.iv_heparin !== '') {
         tableHeader.push({ 'iv_heparin': tableData.iv_heparin.header });
         table_data.iv_heparin = tableData.iv_heparin;
      }

      table_data.headers = tableData.headers;
      table_data.date[5].d_0 = this.state.date_of_procedure;
      
      this.setState({
         approved_by: respData.approved_by,
         table: table_data,
         vka_chkBox: respData.is_vka_selected !== "0" ? true : false,
         doac_chkBox: respData.is_doac_selected !== "0" ? true : false,
         antiplatelets_chkBox: respData.is_antiplatelets_selected !== "0" ? true : false,
         aspirin_chkBox: respData.is_aspirin_selected !== "0" ? true : false,
         iv_heparin_chkBox: respData.is_iv_heparin_selected !== "0" ? true : false,
         lmwh_chkBox: respData.is_lmwh_selected !== "0" ? true : false,
         activeVKA: respData.activeVKA,
         activeDOAC: respData.activeDOAC,
         activeLMWH: respData.activeLMWH,
         cell: cellData
      });
      console.log('table data ==> ', tableData, this.state, respData);
   }

   submitForm() {
      this.props.history.push({ pathname: '/Nurse/Nurse3', state: { 'is_lmwh_selected': this.state.lmwh_chkBox } });
   }

   print() {
      printJS('dataTable', 'html');
   }

   //

   render() {

      return (
         <React.Fragment>
            <Header />
            {this.state.loader === 1 ? (
               <div className="centered">
                  <ReactSpinner type="border" color="blue" size="5" />
               </div>
            ) : (
               ''
            )}

            <div className="container">
               <h2 className="text-center myHeading">Dosage Schedule</h2>
               <br />
               <br />
               <div className="jumbotron" style={{ paddingTop: '2.25rem' }}>
                  {
                     this.state.table !== undefined ?
                     <>
                        <table id="dataTable" style={{ display: "inline-table", textAlign: 'center' }} className="table-responsive table-bordered">
                           <tr style={{ borderBottom: "1px solid #ccc" }}>
                              <th rowSpan={2}>Date</th>
                              {
                                 this.state.vka_chkBox ? 
                                 <>
                                    <th rowSpan={2}>Lab</th>
                                    <th colSpan={2}>
                                       {this.state.activeVKA !== '' ? this.state.activeVKA : this.state.table.headers?.find(x => x['vka']).vka[0].med_name}
                                    </th>
                                 </> : <></>
                              }
                              {
                                 this.state.doac_chkBox ?
                                 <th colSpan={2}>
                                    {this.state.activeDOAC !== '' ? this.state.activeDOAC : this.state.table.headers?.find(x => x['doac']).doac[0].med_name}
                                 </th> : <></>
                              }
                              {
                                 this.state.antiplatelets_chkBox ?
                                 <th colSpan={2}>
                                    {this.state.table.headers?.find(x => x['antiplatelets']).antiplatelets[0].med_name}
                                 </th> : <></>
                              }
                              {
                                 this.state.lmwh_chkBox ?
                                 <th colSpan={2}>
                                    {this.state.activeLMWH !== '' ? this.state.activeLMWH : this.state.table.headers?.find(x => x['lmwh']).lmwh[0].med_name}
                                 </th> : <></>
                              }
                              {
                                 this.state.aspirin_chkBox ?
                                 <th colSpan={2}>
                                    {this.state.table.headers?.find(x => x['aspirin']).aspirin[0].med_name}
                                 </th> : <></>
                              }
                              {
                                 this.state.iv_heparin_chkBox ?
                                 <th colSpan={2}>
                                    {this.state.table.headers?.find(x => x['iv_heparin']).med_name}
                                 </th> : <></>
                              }
                           </tr>
                           <tr style={{ borderBottom: "1px solid #ccc" }}>
                              {
                                 this.state.vka_chkBox ? 
                                 <>
                                    <th></th>
                                    <th>dosage</th>
                                    <th>frequency</th>
                                 </> : <></>
                              }
                              {
                                 this.state.doac_chkBox ?
                                 <>
                                    <th>dosage</th>
                                    <th>frequency</th>
                                 </> : <></>
                              }
                              {
                                 this.state.antiplatelets_chkBox ?
                                 <>
                                    <th>dosage</th>
                                    <th>frequency</th>
                                 </> : <></>
                              }
                              {
                                 this.state.lmwh_chkBox ?
                                 <>
                                    <th>dosage</th>
                                    <th>frequency</th>
                                 </> : <></>
                              }
                              {
                                 this.state.aspirin_chkBox ?
                                 <>
                                    <th>dosage</th>
                                    <th>frequency</th>
                                 </> : <></>
                              }
                              {
                                 this.state.iv_heparin_chkBox ?
                                 <>
                                    <th>dosage</th>
                                    <th>frequency</th>
                                 </> : <></>
                              }
                           </tr>
                           {
                              this.state.table.date?.map((date, key) => {
                                 let dataKey = Object.keys(date)[0];
                                 let vkaKey = key;
                                 let antiplateletKey = key;
                                 let lmwhKey = key;
                                 let doacKey = key;
                                 let aspirinKey = key;
                                 let ivHeparinKey = key;

                                 return (
                                    <>
                                       <tr key={`date-${date[dataKey]}-key-${key}`} style={{ borderBottom: "1px solid #ccc" }}>
                                          <td>{date[dataKey]}</td>
                                          {
                                             this.state.vka_chkBox ?
                                             <>
                                                <td>{this.state.cell[`labVal${vkaKey+1}`]}</td> : <></>
                                                <td>{this.state.cell[`InptValVka${vkaKey+1}`]}</td>
                                                <td>{this.state.cell[`selectValVka${vkaKey+1}`]}</td>
                                             </> 
                                             : <></>
                                          }
                                          {this.state.doac_chkBox ?
                                             <>
                                                <td>{this.state.cell[`InptValDoac${doacKey+1}`]}</td>
                                                <td>{this.state.cell[`selectValDoac${doacKey+1}`]}</td>
                                             </> : <></>
                                          }
                                          {this.state.antiplatelets_chkBox ?
                                             <>
                                                <td>{this.state.cell[`InptValAntiplatelets${antiplateletKey+1}`]}</td>
                                                <td>{this.state.cell[`selectValAntiplatelets${antiplateletKey+1}`]}</td>
                                             </> : <></>
                                          }
                                          {this.state.lmwh_chkBox ?
                                             <>
                                                <td>{this.state.cell[`InptValLmwh${lmwhKey+1}`]}</td>
                                                <td>{this.state.cell[`selectValLmwh${lmwhKey+1}`]}</td>
                                             </> : <></>
                                          }
                                          {this.state.aspirin_chkBox ?
                                             <>
                                                <td>{this.state.cell[`InptValAspirin${aspirinKey+1}`]}</td>
                                                <td>{this.state.cell[`selectValAspirin${aspirinKey+1}`]}</td>
                                             </> : <></>
                                          }
                                          {this.state.iv_heparin_chkBox ?
                                             <>
                                                <td>{this.state.cell[`InptValIvHeparin${ivHeparinKey+1}`]}</td>
                                                <td>{this.state.cell[`selectValIvHeparin${ivHeparinKey+1}`]}</td>
                                             </> : <></>
                                          }
                                       </tr>
                                    </>
                                 )
                              })
                           }
                        </table>
                     </> : ""
                  }
                  <div className="row" style={{ marginTop: '60px' }}>
                     <div className="col-4">
                        <Link to={{ pathname: "/Nurse/Nurse4", state: { 'add_new_recom': true, 'recom_id': this.state.recom_id } }} className="btn btn-outline-primary  btn-block">
                           Back
                        </Link>
                     </div>

                     <div className="col-4">
                        <button onClick={this.print} className="btn btn-primary btn-block">
                           Print
                        </button>
                     </div>

                     <div className="col-4">
                        <button onClick={this.submitForm} className="btn btn-primary btn-block">
                           Accept
                        </button>
                     </div>
                  </div>
               </div>
               <br />
            </div>
         </React.Fragment>
      );
   }
}
export default Page6;
