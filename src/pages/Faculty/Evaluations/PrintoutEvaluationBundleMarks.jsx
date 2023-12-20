import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import { numbersToWords, numToRoman } from '../../../reducers/Utils';
import axios from 'axios';
import { EVALUATION_BUNDLE_GET, GET_ALL_MARKS } from '../../../reducers/ApiEndPoints';
import Cookies from 'js-cookie';

export default function PrintoutEvaluationBundleMarks() {
    const [evaluationBundle, setEvaluationBundle] = useState()
    const [evaluation, setEvaluation] = useState()
    const [marks, setMarks] = useState([])
    const { evaluationBundleId } = useParams();

    useEffect(() => {
        axios({
            method: 'GET',
            url: EVALUATION_BUNDLE_GET,
            params: {
                evaluationBundleId: evaluationBundleId
            },
            headers: {
                Authorization: 'Bearer ' + Cookies.get('authtoken')
            }
        }).then(res => {
            setEvaluationBundle(res?.data?.data)
            setEvaluation(res?.data?.data?.evaluation)
        }).catch(err => {
            alert(err?.response?.data?.message ?? "Some error occurred!")
            console.log(err)
        })
    }, [evaluationBundleId])

    useEffect(() => {
        axios({
            method: 'GET',
            url: GET_ALL_MARKS,
            params: {
                evaluationBundleId: evaluationBundleId
            },
            headers: {
                Authorization: 'Bearer ' + Cookies.get('authtoken')
            }
        }).then((res) => {
            setMarks(res?.data?.data)
            console.log(res?.data?.message)
        }).catch(err => {
            alert(err?.response?.data?.message ?? "Some error occurred!")
        })
    }, [evaluationBundleId])

    // if (evaluationBundle?.disablePrintout) {
    //     return <><br /><br />Not Allowed</>
    // }
    return (
        <div className='pt-3 bg-dark'>
            {/* {evaluation?.disableMarksEntry ?
            marks.length && */}
            <PDFViewer style={{
                width: '100%',
                height: '100vh'
            }}>
                <MyDocument evaluation={evaluation} marks={marks} />
            </PDFViewer>
            {/* : <>Marks Entry not submitted yet!</>
            } */}
        </div>
    )
}

function MyDocument(props) {
    const { marks, evaluation } = props;

    let department = evaluation?.course?.department;

    return (
        <>
            <Document title={(evaluation?.exam?.name + "_" + evaluation?.course?.code + "_" + evaluation?.startPaperNumber + "-" + evaluation?.endPaperNumber).replaceAll(" ", "_") + "_Marks"}>
                <Page size="A4" style={styles.page}>
                    <View style={styles.table}>
                        <Text style={{ ...styles.titleText, paddingBottom: '2.5px', fontSize: '10px' }}>
                            K.S.RANGASAMY COLLEGE OF TECHNOLOGY, TIRUCHENGODE - 637 215
                        </Text>

                        <Text style={{ ...styles.titleText, paddingBottom: '3.5px', fontSize: '8px' }}>
                            (An Autonomous Institution Affiliated to Anna University, Chennai - 600 025)
                        </Text>
                        <Text style={{ ...styles.titleText, paddingBottom: '3.5px', fontSize: '11px' }}>
                            {evaluation?.exam?.name}
                        </Text>
                        <Text style={{ ...styles.titleText, paddingBottom: '5px', fontSize: '12px', fontWeight: 'bolder' }}>
                            EVALUATION REPORT
                        </Text>
                        <View style={{ ...styles.tr, border: '0' }}>
                            <Text style={{ ...styles.th, width: '30%', border: '0' }}>
                                Programme & Semester :
                            </Text>
                            <Text style={{ ...styles.th, border: '0' }}>
                                {department?.degree?.code + " " + department?.name + " Semester " + numToRoman(evaluation?.exam?.semester)}
                            </Text>
                        </View>
                        <View style={{ ...styles.tr, border: '0', }}>
                            <Text style={{ ...styles.th, width: '30%', border: '0', }}>
                                Course Code & Title :
                            </Text>
                            <Text style={{ ...styles.th, border: '0', }}>
                                {evaluation?.course?.code + " " + evaluation?.course?.name}
                            </Text>
                        </View>
                        <View style={{ ...styles.tr, border: '0' }}>
                            <Text style={{ ...styles.th, width: '30%', border: '0', }}>
                                Date :
                            </Text>
                            <Text style={{ ...styles.th, border: '0' }}>
                                {/* {displayDDMMYYY(new Date(evaluation?.startTime))} */}
                            </Text>
                        </View>

                        {/*Table head */}
                        <View style={{ ...styles.tr, marginTop: '10px' }}>
                            <Text style={{ ...styles.th, width: '35%' }}>Sno</Text>
                            <Text style={{ ...styles.th, width: '110%' }}>Paper number</Text>
                            <Text style={{ ...styles.th, width: '65%', textAlign: '' }}>Marks in numbers</Text>
                            <Text style={{ ...styles.th, width: '140%' }}>Marks in words</Text>
                        </View>
                        {/* body */}
                        {
                            marks?.map((stMark, ind) => {
                                return (
                                    <View style={styles.tr} key={ind}>
                                        <Text style={{ ...styles.td, width: '35%' }} >{ind + 1}</Text>
                                        <Text style={{ ...styles.td, width: '110%' }}>{stMark?.evaluationPaper?.number}</Text>
                                        <Text style={{ ...styles.td, width: '65%', textAlign: '' }}>{
                                            stMark?.marks
                                        }</Text>
                                        <Text style={{ ...styles.td, width: '140%' }}>{
                                            numbersToWords(stMark?.marks)
                                        }</Text>
                                    </View>
                                )
                            })
                        }

                        <View style={{ ...styles.tr }}>
                            <Text style={{ ...styles.td, width: '80%' }}>Evaluator</Text>
                            <Text style={{ ...styles.td, width: '200%' }}>Faculty Name</Text>
                            <Text style={{ ...styles.td, width: '160%' }}>Designation</Text>
                            <Text style={{ ...styles.td, width: '120%' }}>Signature</Text>
                        </View>
                        <View style={styles.tr}>
                            <Text style={{ ...styles.td, width: '80%', paddingTop: '5px', paddingBottom: '5px' }}>Evaluator 1</Text>
                            <Text style={{ ...styles.td, width: '200%', paddingTop: '5px', paddingBottom: '5px' }}></Text>
                            <Text style={{ ...styles.td, width: '160%', paddingTop: '5px', paddingBottom: '5px' }}></Text>
                            <Text style={{ ...styles.td, width: '120%', paddingTop: '5px', paddingBottom: '5px' }}></Text>
                        </View>
                        <View style={styles.tr}>
                            <Text style={{ ...styles.td, width: '80%', paddingTop: '5px', paddingBottom: '5px' }}>Evaluator 2</Text>
                            <Text style={{ ...styles.td, width: '200%', paddingTop: '5px', paddingBottom: '5px' }}></Text>
                            <Text style={{ ...styles.td, width: '160%', paddingTop: '5px', paddingBottom: '5px' }}></Text>
                            <Text style={{ ...styles.td, width: '120%', paddingTop: '5px', paddingBottom: '5px' }}></Text>
                        </View>
                    </View>
                </Page>
            </Document >
        </>
    )
}


const styles = StyleSheet.create({
    titleText: {
        fontSize: 12,
        width: '100%',
        textAlign: 'center',
        flexDirection: 'row',
    },
    examDetail: {
        fontSize: 11,
        width: '50%',
        textAlign: 'left',
        paddingBottom: '20px'
    },
    footerText: {
        fontSize: 10.5,
        width: '100%',
        textAlign: 'left',
        flexDirection: 'row',
        paddingBottom: '5px',
        paddingLeft: '57.5%'
    },
    page: {
        flexDirection: 'row',
        backgroundColor: ''
    },
    table: {
        display: 'table',
        // borderTop: '1px solid black',
        margin: '25px',
        width: '100%',
    },

    th: {
        borderTop: '1px solid black',
        width: '100%',
        borderRight: '1px solid black',
        fontSize: 10,
        padding: '4px 3px',
    },

    tr: {
        width: '100%',
        flexDirection: 'row',
        borderBottom: '1px solid black',
        borderLeft: '1px solid black'
    },
    td: {
        width: '100%',
        borderRight: '1px solid black',
        fontSize: 9.5,
        padding: '4px 3.5px'
    },

});
