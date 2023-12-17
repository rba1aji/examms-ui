import { SPRINGBOOT_SERVER_URL } from "./ServerUrl";

// export const serverurl = process.env.SPRINGBOOT_SERVER_URL;
export const BASE_URL = SPRINGBOOT_SERVER_URL;

//login
export const STUDENT_LOGIN = BASE_URL + "/auth/v1/student-login"
export const ADMIN_LOGIN = BASE_URL + "/auth/v1/admin-login"
export const FACULTY_LOGIN = BASE_URL + "/auth/v1/faculty-login"

export const GET_ALL_STUDENTS = BASE_URL + "/student/v1/get-all-students";
export const GET_ALL_FACULTIES = BASE_URL + "/faculty/v1/get-all-faculties";
export const GET_ALL_COURSES = BASE_URL + "/course/v1/get-all-courses";
export const GET_ALL_DEPARTMENT = BASE_URL + "/department/v1/get-all-department";
export const GET_ALL_MARKS = BASE_URL + "/marks/v1/get-all-marks";
export const GET_ALL_EXAM = BASE_URL + "/exam/v1/get-all-exam";
export const GET_ALL_EXAMBATCH = BASE_URL + "/exam-batch/v1/get-all-exam-batch";
export const GET_ALL_MARKS_FOR_EXAM_BATCH = BASE_URL + "/marks/v1/get-all-marks-for-exam-batch";
export const GET_EXAM_BATCH = BASE_URL + "/exam-batch/v1/get-exam-batch";

export const EXCEL_REGISTER_STUDENTS = BASE_URL + "/registration/v1/excel-register-students";
export const EXCEL_REGISTER_FACULTIES = BASE_URL + "/registration/v1/excel-register-faculties";
export const EXCEL_REGISTER_COURSES = BASE_URL + "/registration/v1/excel-register-courses";
export const SAVE_UPDATE_COURSES = BASE_URL + "/registration/v1/save-update-course";
export const ADD_UPDATE_EXAM = BASE_URL + "/exam/v1/add-update-exam";
export const ADD_UPDATE_EXAMBATCH = BASE_URL + "/exam-batch/v1/add-update-exam-batch";
export const ADD_UPDATE_MARKS_LIST = BASE_URL + "/marks/v2/add-update-marks-list";
export const SUBMIT_MARKS_ENTRY_BY_FACULTY = BASE_URL + "/exam-batch/v1/submit-marks-entry-by-faculty"
export const GET_ACTIVE_EXAM_BATCHES = BASE_URL + "/faculty/v1/get-active-exam-batches";

export const CHANGE_PASSOWRD = BASE_URL + "/auth/v1/change-password";
export const GET_STUDENT_PROFILE = BASE_URL + "/student/v1/get-profile";
export const EXAM_MARKS_REPORT = BASE_URL + "/report/v1/exam-marks-report";

export const EVALUATION_CREATE = BASE_URL + "/evaluation/v1/create-evaluation-for-course"
export const EVALUATION_GET_ALL = BASE_URL + "/evaluation/v1/get-all-evaluation"
export const EVALUATION_BUNDLES_GET_ALL_FOR_EVALUATIONID = BASE_URL + "/evaluation-bundle/v1/get-all-evaluation-bundle-for-evaluation";

export const EVALUATION_PAPER_SUBMIT_MARKS = (evaluationId, paperId) => BASE_URL + `/evaluation-paper/v1/submit-evaluation-paper-marks/${evaluationId}/${paperId}`
export const CONFIGURATIONS_GET_ALL = BASE_URL + "/configuration/v1/get-all-configuration"
export const CONFIGURATIONS_ADD_UPDATE = BASE_URL + "/configuration/v1/add-update-configuration"