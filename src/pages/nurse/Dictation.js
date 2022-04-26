import React, { Component } from 'react';
// import { EditorState, convertToRaw } from "draft-js";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { domain } from '../../App';
import { server } from '../../utils/functions';
import Header from './NurseHeader';
import ReactSpinner from 'react-bootstrap-spinner';
import { Modal } from 'react-bootstrap';
import Logo from '../../assets/img/3.png';

class Dictation extends Component {
    constructor() {
        super();
        this.state = {
            editorState: '',
            downloadableContent: '',
            loader: '', 
            showHide: '', 
            patient_id: localStorage.getItem('patient_id'),
        };

        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.downloadTxtFile = this.downloadTxtFile.bind(this);
        this.fillactiveantiplatmeds = this.fillactiveantiplatmeds.bind(this);
        this.fillactiveanticogmeds = this.fillactiveanticogmeds.bind(this);
        this.handleModalShowHide = this.handleModalShowHide.bind(this);
    }

    fillactiveanticogmeds(data) {
        let activeMeds = [];
        if(data?.dalteparin) {
           let idx = data?.dalteparin_freq.indexOf(' ');
           activeMeds.push({
              med_name: data?.dalteparin,
              med_dosage: data?.dalteparin_dosage,
              med_dosage_time: data?.dalteparin_freq?.substr(idx+1),
              med_dosage_freequency: data?.dalteparin_freq?.substr(idx+1),
           });
        }
        if(data?.enoxaparin) {
           let idx = data?.enoxaparin_freq.indexOf(' ');
           activeMeds.push({
              med_name: data?.enoxaparin,
              med_dosage: data?.enoxaparin_dosage,
              med_dosage_time: data?.enoxaparin_freq?.substr(idx+1),
              med_dosage_freequency: data?.enoxaparin_freq?.substr(idx+1),
           });
        }
        
        if(data?.tinzaparin) {
           let idx = data?.tinzaparin_freq.indexOf(' ');
           activeMeds.push({
              med_name: data?.tinzaparin,
              med_dosage: data?.tinzaparin_dosage,
              med_dosage_time: data?.tinzaparin_freq?.substr(idx+1),
              med_dosage_freequency: data?.tinzaparin_freq?.substr(idx+1),
           });
        }
        if(data?.pradaxa) {
           let idx = data?.pradaxa_dosage.indexOf(' ', data?.pradaxa_dosage.indexOf(' ')+1);
           activeMeds.push({
              med_name: data?.pradaxa,
              med_dosage: data?.pradaxa_dosage,
              med_dosage_time: data?.pradaxa_dosage?.substr(idx+1),
              med_dosage_freequency: "am / pm",
           });
        } 
        if(data?.xarelto) {
           let idx = data?.xarelto_dosage.indexOf(' ', data?.xarelto_dosage.indexOf(' ')+1);
           activeMeds.push({
              med_name: data?.xarelto,
              med_dosage: data?.xarelto_dosage,
              med_dosage_time: data?.xarelto_dosage?.substr(idx+1),
              med_dosage_freequency: data?.xarelto_dosage_time
           });
        } 
        if(data?.eliquis) {
           let idx = data?.eliquis_dosage.indexOf(' ', data?.eliquis_dosage.indexOf(' ')+1);
           activeMeds.push({
              med_name: data?.eliquis,
              med_dosage: data?.eliquis_dosage,
              med_dosage_time: data?.eliquis_dosage?.substr(idx+1),
              med_dosage_freequency: data?.eliquis_dosage_time
           });
        }
        if(data?.edoxabon) {
           let idx= data?.edoxabon_dosage.indexOf(' ', data?.edoxabon_dosage.indexOf(' ')+1);
           activeMeds.push({
              med_name: data?.edoxabon,
              med_dosage: data?.edoxabon_dosage,
              med_dosage_time: data?.edoxabon_dosage?.substr(idx+1),
              med_dosage_freequency: data?.edoxabon_dosage_time
           });
        }
        
        if(data?.coumadin) {
           activeMeds.push({
              med_name: data?.coumadin,
              med_dosage_monday: data?.coumadin_monday,
              med_dosage_tuesday: data?.coumadin_tuesday,
              med_dosage_wednesday: data?.coumadin_wednesday,
              med_dosage_thursday: data?.coumadin_thursday,
              med_dosage_friday: data?.coumadin_friday,
              med_dosage_saturday: data?.coumadin_saturday,
              med_dosage_sunday: data?.coumadin_sunday
           });
        } 
        
        if(data?.sintrom) {
           activeMeds.push({
              med_name: data?.sintrom,
              med_dosage_monday: data?.sintrom_monday,
              med_dosage_tuesday: data?.sintrom_tuesday,
              med_dosage_wednesday: data?.sintrom_wednesday,
              med_dosage_thursday: data?.sintrom_thursday,
              med_dosage_friday: data?.sintrom_friday,
              med_dosage_saturday: data?.sintrom_saturday,
              med_dosage_sunday: data?.sintrom_sunday
           });
        }
        console.log(activeMeds);
        return activeMeds;
     }
  
     fillactiveantiplatmeds(data) {
        let activeMeds = [];
        if(data?.effient) {
           let idx= data?.effient_dosage.indexOf(' ', data?.effient_dosage.indexOf(' ')+1);
           activeMeds.push({
              med_name: data?.effient,
              med_dosage: data?.effient_dosage,
              med_dosage_freequency: data?.effient_dosage_time,
              med_dosage_time: data?.effient_dosage_time?.substr(idx+1)
           });
        } 
        if(data?.aspirin) {
           let idx= data?.aspirin_dosage.indexOf(' ', data?.aspirin_dosage.indexOf(' ')+1);
           activeMeds.push({
              med_name: data?.aspirin,
              med_dosage: data?.aspirin_dosage,
              med_dosage_freequency: data?.aspirin_dosage_time,
              med_dosage_time: data?.aspirin_dosage_time?.substr(idx+1)
           });
        } 
        if(data?.plavix) {
           let idx= data?.plavix_dosage.indexOf(' ', data?.plavix_dosage.indexOf(' ')+1);
           activeMeds.push({
              med_name: data?.plavix,
              med_dosage: data?.plavix_dosage,
              med_dosage_freequency: data?.plavix_dosage_time,
              med_dosage_time: data?.plavix_dosage_time?.substr(idx+1)
           });
        }
        if(data?.brillinta) {
           let idx= data?.brillinta_dosage.indexOf(' ', data?.brillinta_dosage.indexOf(' ')+1);
           activeMeds.push({
              med_name: data?.brillinta,
              med_dosage: data?.brillinta_dosage,
              med_dosage_freequency: data?.brillinta_dosage_time,
              med_dosage_time: data?.brillinta_dosage_time?.substr(idx+1)
           });
        }
        console.log(activeMeds);
        return activeMeds;
    }
    
    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide });
        const data = { 'content': this.state.editorState, patient_id: localStorage.getItem('patient_id') };
        console.log('server post data ', data, this.state);
        server(`nurse/saveDictations/:${data?.patient_id}`, data);
    }

    componentDidMount() {
        try {
            const headers = {
               'Content-Type': 'application/json',
               Accept: 'application/json',
               Authorization: 'Bearer ' + localStorage.getItem('token'),
            };
            let patient_id = localStorage.getItem('patient_id');
            axios
                .get(domain + `/api/nurse/getDictations/:${patient_id}`, {
                headers: headers,
                })
                .then((response) => {
                const data = response.data?.success[0];
                const medicationData = JSON.parse(data?.jsonTable);
                const antiCogDrugs = this.fillactiveanticogmeds(data);
                const antiPlatDrugs = this.fillactiveantiplatmeds(data);
                console.log('Dictation Note - res: ', response, medicationData);
                const content = `
                    <p style="font-weight: bold;">Episode information</p>
                    <br />
                    <p>Date of visit: ${data?.assessment_date}</p>
                    <br />
                    <p>Physician: ${data?.physicianName}</p>
                    <br />
                    <p>Form completed by: ${data?.who_is_completing_this_form}</p>
                    <br />
                    <p>Proposed date of procedure: ${data?.date_of_procedure_patient}</p>
                    <br />
                    <p>Proposed procedure: ${data?.type_of_procedure}</p>
                    <br />
                    <p>Surgeon/interventionalist: ${data?.physicianName}</p>
                    <br />
                    <p style="font-weight: bold;">Patient information</p>
                    <br />
                    <p>Age: ${data?.age}</p>
                    <br />
                    <p>Sex: ${data?.gender}</p>
                    <br />
                    <p>Weight (${data?.weight_unit}): ${data?.weight}</p>
                    <br />
                    <p>Indication(s) for anticoagulation: ${data?.indication_for_anticoagulation}</p>
                    <br />
                    <p>Weight (${data?.weight_unit}): ${data?.weight}</p>
                    <br />
                    <p style="font-weight: bold;">Current antithrombotic therapy:</p>
                    <ul>
                        ${
                            antiCogDrugs.length !== 0 ? 
                            antiCogDrugs.map((drug, index) => {
                                return (`
                                    <li><p key=${index}>
                                        <span>${drug.med_name}</span>
                                        ${
                                            drug.med_name.startsWith('Coumadin') ? 
                                            `
                                                <br />
                                                <span>Monday: </span> <span>${drug.med_dosage_monday}</span>
                                                <br />
                                                <span>Tuesday: </span> <span>${drug.med_dosage_tuesday}</span>
                                                <br />
                                                <span>Wednesday: </span> <span>${drug.med_dosage_wednesday}</span>
                                                <br />
                                                <span>Thrusday: </span> <span>${drug.med_dosage_thursday}</span>
                                                <br />
                                                <span>Friday: </span> <span>${drug.med_dosage_friday}</span>
                                                <br />
                                                <span>Saturday: </span> <span>${drug.med_dosage_saturday}</span>
                                                <br />
                                                <span>Sunday: </span> <span>${drug.med_dosage_sunday}</span>
                                            ` 
                                            : drug.med_name.startsWith('Sintrom') ?
                                            `
                                                <span>Monday: </span> <span>${drug.med_dosage_monday}</span>
                                                <br />
                                                <span>Tuesday: </span> <span>${drug.med_dosage_tuesday}</span>
                                                <br />
                                                <span>Wednesday: </span> <span>${drug.med_dosage_wednesday}</span>
                                                <br />
                                                <span>Thrusday: </span> <span>${drug.med_dosage_thursday}</span>
                                                <br />
                                                <span>Friday: </span> <span>${drug.med_dosage_friday}</span>
                                                <br />
                                                <span>Saturday: </span> <span>${drug.med_dosage_saturday}</span>
                                                <br />
                                                <span>Sunday: </span> <span>${drug.med_dosage_sunday}</span>
                                            `
                                            : 
                                            `<span> ${drug.med_dosage}</span> 
                                            <span> ${drug.med_dosage_freequency}</span>`   
                                        }
                                    </p></li>`)
                            }) : ""
                        }
                    </ul>
                    <br />
                    <ul>
                        <br />
                        ${
                            antiPlatDrugs.length !== 0 ? 
                            antiPlatDrugs.map((drug, index) => {
                                return (`
                                    <li><p key=${index}>
                                        <span>${drug.med_name}</span>
                                        ${
                                            `<span> ${drug.med_dosage}</span> 
                                            <span> ${drug.med_dosage_freequency}</span>`   
                                        }
                                    </p></li>`)
                            }) : ""
                        }
                    </ul>
                    <br />
                    <p>Bleeding risk factors: (${data?.weight_unit}): ${data?.weight}</p>
                    <br />
                    <p style="font-weight: bold;">Investigations</p>
                    <br />
                    <p>Creatinine: ${data?.poc_creat_text} - ${data?.poc_creat_date}</p>
                    <br />
                    <p>Estimated Creatinine clearance: ${data?.crcl}</p>
                    <br />
                    ${data?.is_vka_selected !== "0" ? `<p>INR: ${data?.poc_inr_text} - ${data?.poc_inr_date}</p>` : ''}
                    <br />
                    <p style="font-weight: bold;">Preiprocedural recommendation</p>
                    <br />
                    ${
                        data.is_vka_selected !== "0" ? 
                        `<p style="font-weight: bold;">Warfain: ${data?.activeVKA}
                            ${
                                medicationData.vka !== "" ?
                                `<br />
                                <span>Last dose before procedure: ${medicationData?.vka[4]?.warfain}</span>
                                <br />
                                <span>Resumption after procedure:  ${medicationData?.vka[6]?.warfain}</span>` : ""
                            }
                        </p>` : ''
                    }
                    <br />
                    ${
                        data.is_lmwh_selected !== "0" ? 
                        `<p style="font-weight: bold;">LMWH: ${data?.activeLMWH}
                            ${
                                medicationData.lmwh !== "" ?
                                `<br />
                                <span>Last dose before procedure: ${medicationData?.lmwh[4]?.dosage}</span>
                                <br />
                                <span>Resumption after procedure:  ${medicationData?.lmwh[6]?.dosage}</span>` : ""
                            }
                        </p>` : ''
                    }
                    <br />
                    ${
                        data.is_doac_selected !== "0" ? 
                        `<p style="font-weight: bold;">DOAC: ${data?.activeDOAC}
                            ${
                                medicationData.doac !== "" ?
                                `<br />
                                <span>Last dose before procedure: ${medicationData?.doac[4]?.dosage}</span>
                                <br />
                                <span>Resumption after procedure:  ${medicationData?.doac[6]?.dosage}</span>` : ""
                            }
                        </p>` : ''
                    }
                    <br />
                    ${
                        data.is_antiplatelets_selected !== "0" ? 
                        `<p style="font-weight: bold;">Antiplatelets: ${medicationData.headers[3].antiplatelets[0].med_name}
                            ${
                                medicationData.antiplatelets !== "" ?
                                `<br />
                                <span>Last dose before procedure: ${medicationData?.antiplatelets[4]?.antiplatelets}</span>
                                <br />
                                <span>Resumption after procedure:  ${medicationData?.antiplatelets[6]?.antiplatelets}</span>` : ""
                            }
                        </p>` : ''
                    }
                    <br />
                    ${
                        data.is_aspirin_selected !== "0" ? 
                        `<p style="font-weight: bold;">Aspirin: Aspirin (ASA)
                            ${
                                medicationData.aspirin !== "" ?
                                `<br />
                                <span>Last dose before procedure: ${medicationData?.aspirin[4]?.aspirin}</span>
                                <br />
                                <span>Resumption after procedure:  ${medicationData?.aspirin[6]?.aspirin}</span>` : ""
                            }
                        </p>` : ''
                    }
                    <br />
                    <p style="font-weight: bold;">Patient Logistics & Understanding</p>
                    <br />
                    <p>
                        The patient was contacted on ${data?.briefing_date} to review their plan. The risks and benefits 
                        of the recommendation were explained and the patient was given the opportunity to ask questions.
                        <br />
                        ${data.is_lmwh_selected !== "0" ? `Instructions were provided with their low molecular weight heparin. 
                        The injections will be administered by ${data?.administration}.` : ''} 
                        The patient ${data.is_first_time ? "has" : "has not"} had previous experience with self-injection.
                        The patient has a ${data.understanding} understanding of the plan for their care.<br />
                        It has been a pleasure to be involved in the care of this patient.<br />
                        Dr. ${data.approved_by}
                    </p>
                `;
                if (response.data?.success !== 'not_found') {
                    this.setState({ 
                        editorState: content 
                    });
                }
            });
        } catch(ex) { 
            console.log('error ', ex.message); 
        }
    }

    handleEditorChange(contentState, delta, source, editor) {
        this.setState({ 
            editorState: contentState,
            downloadableContent: editor.getText()
        });
        console.log('RAW Content ', editor.getText());
    }

    downloadTxtFile() {
        const element = document.createElement("a");
        const file = new Blob([this.state.downloadableContent], {
          type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "dictation_note.txt";
        document.body.appendChild(element);
        element.click();
    };

    render() {
        const { editorState } = this.state;

        return (
            <>
                <Header />
                {this.state.loader === 1 ? (
                <div className="centered">
                    <ReactSpinner type="border" color="blue" size="5" />
                </div>
                ) : (
                ''
                )}
                <Modal show={this.state.showHide}>
                    <Modal.Body className="blue-bg">
                        {' '}
                        <div className="row">
                            <div className="col-6 offset-3">
                                <img src={Logo} alt="logo" className="img-fluid" style={{ height: 200 }} />
                            </div>
                        </div>{' '}
                        <p className="white">
                            Thank you for completing the Bridging Form, Please keep a copy of the Medication Schedule for your
                            records.
                        </p>
                        <div className="row">
                            <div className="col-6"></div>
                            <div className="col-6">
                                <Link to="/">
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-block big-btn-white"
                                    data-dismiss="modal"
                                    onClick={this.handleModalShowHide}
                                >
                                    OK
                                </button>
                                </Link>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                <div className='container'>
                    <h4 className="text-center myHeading">Dictation Note</h4>
                    <div className='row'>
                        <div className='col12'>
                            <div style={{ border: "1px solid black", padding: '2px' }}>
                                {/* <Editor
                                    wrapperId={'dectation'}
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
                                /> */}
                                <ReactQuill id='text-editor' theme="snow" value={editorState} onChange={this.handleEditorChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: '60px' }}>
                        <div className="col-3">
                            <Link to={{ pathName: "/Nurse/Nurse3", state: { 'lmwh_flag': false } }} className="btn btn-outline-primary  btn-block">
                                Back
                            </Link>
                        </div>

                        <div className="col-3">
                            <button className="btn btn-outline-danger  btn-block" onClick={() => alert('Are you sure!')}>
                                Cancel
                            </button>
                        </div>
                        
                        <div className="col-3">
                            <button className="btn btn-outline-info  btn-block" onClick={this.downloadTxtFile}>
                                Save File
                            </button>
                        </div>

                        <div className="col-3">
                            <button className="btn btn-outline-primary  btn-block" onClick={this.handleModalShowHide}>
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Dictation;