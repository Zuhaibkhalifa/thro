export default function procedures(procedure, handleProcedure, validation_message, showValidator = true) {
   return (
      <div className="form-group">
         <label htmlFor="usr">Procedure </label>
         <select
            id="procedure"
            className="custom-select"
            value={procedure}
            onChange={(e) => handleProcedure(e.target.value)}
         >
            <option value="Select_Surgery">Select Surgery</option>
            <optgroup label="Neurosurgery/Spine">
               <option value="Neuraxial procedure (high)">Neuraxial procedure (high)</option>
               <option value="Neurosurgery or Spinal Surgery (high)">Neurosurgery or Spinal Surgery (high)</option>
            </optgroup>

            <optgroup label="GI/abdominal">
               <option value="Abdominal surgery (mod)">Abdominal surgery (mod)</option>
               <option value="Gastroscopy or colonoscopy without biopsy (low)">
                  Gastroscopy or colonoscopy without biopsy (low)
               </option>
               <option value="Gastroscopy or colonoscopy with biopsy (mod)">
                  Gastroscopy or colonoscopy with biopsy (mod)
               </option>
               <option value="Intestinal anastomosis (high)">Intestinal anastomosis (high)</option>
               <option value="Extensive cancer surgery (e.g. liver/pancreas) (high)">
                  Extensive cancer surgery (e.g. liver/pancreas) (high)
               </option>
            </optgroup>

            <optgroup label="Lung/Thoracic (non-cardiac)">
               <option value="Lung resection (high)">Lung resection (high)</option>
               <option value="Other intrathoracic surgery (mod)">Other intrathoracic surgery (mod)</option>
            </optgroup>
            <optgroup label="Orthopedic">
               <option value="Major orthopedic surgery (high">Major orthopedic surgery (high)</option>
               <option value="Other orthopedic surgery (mod)">Other orthopedic surgery (mod)</option>
            </optgroup>

            <optgroup label="Eye">
               <option value="Cataract surgery (low)">Cataract surgery (low)</option>
               <option value="Non-cataract ophthalmological surgery (mod)">
                  Non-cataract ophthalmological surgery (mod)
               </option>
            </optgroup>

            <optgroup label="Dental">
               <option value="Complex dental procedure (e.g. multiple tooth extractions) (mod)">
                  Complex dental procedure (e.g. multiple tooth extractions) (mod)
               </option>
               <option value="Dental other than multiple tooth extractions or maxillofacial surgery (low)">
                  Dental other than multiple tooth extractions or maxillofacial surgery (low)
               </option>
            </optgroup>
            <optgroup label="Plastic surgery">
               <option value="Reconstructive plastic surgery (high)">Reconstructive plastic surgery (high)</option>
               <option value="Other plastic surgery (mod)">Other plastic surgery (mod)</option>
            </optgroup>
            <optgroup label="Cardiac or vascular">
               <option value="Cardiac surgery (high)">Cardiac surgery (high)</option>
               <option value="Coronary angiography (low)">Coronary angiography (low)</option>
               <option value="Permanent pacemaker or ICD placement (if patient is on apixaban, edoxaban, rivaroxaban, or dabigatran – mod, if on any other drugs - low)">
                  Permanent pacemaker or ICD placement (if patient is on apixaban, edoxaban, rivaroxaban, or dabigatran
                  – mod, if on any other drugs - low)
               </option>
               <option value="Major vascular surgery (aortic aneurysm repair, aortofemoral bypass) (high)">
                  Major vascular surgery (aortic aneurysm repair, aortofemoral bypass) (high)
               </option>
               <option value="Other vascular surgery (mod)">Other vascular surgery (mod)</option>
            </optgroup>

            <optgroup label="Needle biopsy">
               <option value="Kidney biopsy (high)">Kidney biopsy (high)</option>
               <option value="Prostate biopsy (high)">Prostate biopsy (high)</option>
               <option value="Cervical cone biopsy (high)">Cervical cone biopsy (high)</option>
               <option value="Pericardiocentesis (high)">Pericardiocentesis (high)</option>
               <option value="Colonic polypectomy (high)">Colonic polypectomy (high)</option>
               <option value="Bone marrow biopsy (mod)">Bone marrow biopsy (mod)</option>
               <option value="Lymph node biopsy (mod)">Lymph node biopsy (mod)</option>
               <option value="Low-risk procedures (e.g. thoracentesis, paracentesis, arthrocentesis) (low)">
                  Low-risk procedures (e.g. thoracentesis, paracentesis, arthrocentesis) (low)
               </option>
            </optgroup>

            <optgroup label="Urological">
               <option value="Urological surgery (high)">Urological surgery (high)</option>
               <option value="Other general surgery (e.g. breast) (mod)">
                  Other general surgery (e.g. breast) (mod)
               </option>
               <option value="Extensive cancer surgery (high)">Extensive cancer surgery (high)</option>
            </optgroup>
         </select>

         {showValidator && validation_message}
      </div>
   );
}
