import React, { useState } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import ExamData from './ExamData';
import { useParams } from 'react-router-dom';
import { attendanceConfig, } from '../../reducers/Utils';

export default function PrintoutAttendance() {
    const [examBatch, setExamBatch] = useState({});
    const [studentMarks, setStudentMarks] = useState([]);

    const { examBatchId } = useParams();

    return (
        <div className='pt-3 bg-dark'>

            <ExamData
                examBatchId={examBatchId}
                examBatch={examBatch}
                setExamBatch={setExamBatch}
                setStudentMarks={setStudentMarks}
            />
            {studentMarks.length &&
                <PDFViewer style={{
                    width: '100%',
                    height: '100vh'
                }}>
                    <MyDocument
                        examBatch={examBatch}
                        studentMarks={studentMarks}
                    />
                </PDFViewer>
            }
        </div>
    )
}

function MyDocument(props) {
    const { studentMarks, examBatch } = props;

    return (
        <>
            <Document title={(examBatch?.exam?.name + "_" + examBatch?.course?.code + "_" + examBatch?.name).replaceAll(" ", "_") + "_Attendance"}>
                <Page size="A4" style={styles.page}>

                    <View style={styles.table}>
                        <Text style={{ ...styles.titleText, paddingBottom: '2.5px' }}>
                            K.S.RANGASAMY COLLEGE OF TECHNOLOGY, TIRUCHENGODE - 637 215
                        </Text>

                        <Text style={{ ...styles.titleText, paddingBottom: '15px', fontSize: 9 }}>
                            (An Autonomous Institution Affiliated to Anna University, Chennai - 600 025)
                        </Text>

                        <View style={{ ...styles.tr, border: '0', padding: '0 0px' }}>
                            <Text style={{ ...styles.th, width: '50%', border: '0' }}>
                                Course Code: {examBatch?.course?.code}
                            </Text>
                            <Text style={{ ...styles.th, width: '50%', border: '0', paddingLeft: '20px' }}>
                                Batch: {examBatch?.exam?.batch}
                            </Text>
                        </View>
                        <View style={{ ...styles.tr, border: '0', padding: '0 0px', paddingBottom: '15px' }}>
                            <Text style={{ ...styles.th, width: '50%', border: '0', }}>
                                Course Title: {examBatch?.course?.name}
                            </Text>
                            <Text style={{ ...styles.th, width: '50%', border: '0', paddingLeft: '20px' }}>
                                Semester: {examBatch?.exam?.semester}
                            </Text>
                        </View>

                        {/*Table head */}
                        <View style={styles.tr}>
                            <Text style={{ ...styles.th, width: '35%' }}>Sno</Text>
                            <Text style={{ ...styles.th, width: '110%' }}>Register number</Text>
                            <Text style={{ ...styles.th, width: '220%' }}>Full name</Text>
                            <Text style={{ ...styles.th, width: '100%' }}>Attendance</Text>
                            {/* <Text style={{ ...styles.th, width: '65%', textAlign: '' }}>Marks in numbers</Text>
                            <Text style={{ ...styles.th, width: '140%' }}>Marks in words</Text> */}
                            <Text style={{ ...styles.th, width: '140%' }}>Student sign</Text>
                        </View>
                        {/* body */}
                        {
                            studentMarks?.map((stMark, ind) => {
                                return (
                                    <View style={styles.tr} key={ind}>
                                        <Text style={{ ...styles.td, width: '35%' }} >{ind + 1}</Text>
                                        <Text style={{ ...styles.td, width: '110%' }}>{stMark?.student.registerNumber}</Text>
                                        <Text style={{ ...styles.td, width: '220%' }}>{stMark?.student?.fullName}</Text>
                                        <Text style={{ ...styles.td, width: '100%' }}>{
                                            stMark?.attendance ? attendanceConfig[stMark?.attendance]?.value : '-'
                                        }</Text>
                                        {/* <Text style={{ ...styles.td, width: '65%', textAlign: '' }}>{
                                        studentMarks?.find(m => m.studentid === stMark.id)?.mark
                                    }</Text>
                                    <Text style={{ ...styles.td, width: '140%' }}>{
                                        numbersToWords(studentMarks?.find(m => m.studentid === stMark.id)?.mark)
                                    }</Text> */}
                                        <Text style={{ ...styles.td, width: '140%' }}></Text>
                                    </View>
                                )
                            })
                        }



                        <Text style={{ ...styles.footerText, paddingTop: '20px' }}>
                            Internal Examiner 1: {examBatch?.faculty?.fullName}
                        </Text>
                        <Text style={{ ...styles.footerText, }}>
                            Internal Examiner 2:
                        </Text>

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
