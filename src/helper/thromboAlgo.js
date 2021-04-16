import axios from 'axios';

import { domain } from '../App';

//
//

export default async function indicationAlgo() {
    console.log('ThromboAlgo Called!!!');

    const indicationBleedingRiskAlgo = async () => {
        let data = await getIndicationBleedingRiskData();
        const d = mapIndicationData(data);

        // Standard risk indication (0)
        if (d.Bileaflet_mech_aortic_valve && d.CHADS == 0 && !d.AF) return 0;
        else if (d.AF && d.CHADS < 5 && !d.Stroke_lt_1 && !d.Mitral) return 0;
        else if (d.VTE && d.VTE_dvt_gt_3 && d.VTE_pe_gt_3) return 0;

        // High-risk indication (1)
        if (d.Antiphospholipid) return 1;
        else if (d.AF && d.Mitral) return 1;
        else if (d.AF && d.CHADS >= 5) return 1;
        else if (d.Mech_heart && d.Mitral_loc) return 1;
        else if (d.AF && (d.Stroke_lt_1 || d.Stroke_btwn_1_3)) return 1;
        else if (d.Mech_heart && d.Arotic_loc && (d.CHADS > 0 || d.AF)) return 1;
        else if (d.VTE && (d.VTE_dvt_lt_1 || d.VTE_dvt_btwn_1_3 || d.VTE_pe_lt_1 || d.VTE_pe_btwn_1_3)) return 1;
    };

    const getIndicationBleedingRiskData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        };

        try {
            const response = await axios.get(domain + '/api/nurse/medicationAlgoDetails', {
                headers: headers,
            });

            console.log('ThromboAlgo - response: ', response.data.success[0]);
            return response.data.success[0];

            //
        } catch (error) {
            console.error(error);
        }
    };
    const mapIndicationData = (data) => {
        let variables = {};

        variables['Bileaflet_mech_aortic_valve'] =
            data.mechanical_heart_valve_Is_the_valve_bileaflet != null ? true : false;

        variables['CHADS'] = data.chads_score_and_distribution;

        variables['AF'] = data.atrial_fibrillation_of_flutter == 'Yes' ? true : false;

        variables['Mitral'] = data.mitral_stenosis == 'Yes' ? true : false;

        variables['Stroke_lt_1'] =
            data.stroke_or_mini_stroke == 'Yes' && data.stroke_how_long == 'Less than 1 month ago' ? true : false;
        variables['Stroke_btwn_1_3'] =
            data.stroke_or_mini_stroke == 'Yes' && data.stroke_how_long == 'Between 1 and 3 months ago' ? true : false;
        variables['Stroke_gt_3'] =
            data.stroke_or_mini_stroke == 'Yes' && data.stroke_how_long == 'More than 3 months ago' ? true : false;

        variables['VTE'] = data.venous_thromboelism == 'Yes' ? true : false;
        variables['VTE_dvt_lt_1'] =
            data.dvt == 'Yes' && data.dvt_how_long_ago == 'Less than 1 month ago' ? true : false;
        variables['VTE_dvt_btwn_1_3'] =
            data.dvt == 'Yes' && data.dvt_how_long_ago == 'Between 1 and 3 months ago' ? true : false;
        variables['VTE_dvt_gt_3'] =
            data.dvt == 'Yes' && data.dvt_how_long_ago == 'More than 3 months ago' ? true : false;
        variables['VTE_pe_lt_1'] =
            data.pe == 'Yes' && data.pe_dvt_how_long_ago == 'Less than 1 month ago' ? true : false;
        variables['VTE_pe_btwn_1_3'] =
            data.pe == 'Yes' && data.pe_dvt_how_long_ago == 'Between 1 and 3 months ago' ? true : false;
        variables['VTE_pe_gt_3'] =
            data.pe == 'Yes' && data.pe_dvt_how_long_ago == 'More than 3 months ago' ? true : false;

        variables['Mech_heart'] = data.mechanical_heart_valve == 'Yes' ? true : false;
        variables['Mitral_loc'] = data.location_mitral == 'Mitral' ? true : false;
        variables['Arotic_loc'] = data.location_aortic == 'Arotic' ? true : false;

        variables['Antiphospholipid'] = data.antiphospholipid_antibody_syndrome == 'Yes' ? true : false;

        return variables;
    };

    console.log('indicationBleedingRiskAlgo: ', await indicationBleedingRiskAlgo());
}
