import AdminLogin from "../pages/Admin/AdminLogin";
import AdminWorkspace from "../pages/Admin/AdminWorkspace";
import Exam from "../pages/Faculty/Exam";
import FacultyLogin from "../pages/Faculty/FacultyLogin";
import { FacultyWorkspace } from "../pages/Faculty/FacultyWorkspace";
import Home from "../pages/Home"
import StudentLogin from "../pages/student/StudentLogin"
import StudentWorkspace from "../pages/student/StudentWorkspace";
import PrintoutAttendance from '../pages/Faculty/PrintoutAttendance';
import PrintoutMarks from "../pages/Faculty/PrintoutMarks";
import EvaluationPage from "../pages/Faculty/Evaluations/EvaluationPage";
import PrintoutEvaluationBundleMarks from "../pages/Faculty/Evaluations/PrintoutEvaluationBundleMarks";

export const loginRoutes = [
    {
        path: '/student/login',
        title: 'Student login',
        component: <StudentLogin />
    },
    {
        path: '/faculty/login',
        title: 'Faculty login',
        component: <FacultyLogin />
    },
    {
        path: '/admin/login',
        title: 'Admin login',
        component: <AdminLogin />
    }
]

export const adminWorkspaceRoutes = [
    {
        path: '/admin/workspace',
        title: 'Admin Workspace',
        component: <AdminWorkspace />
    }
];

export const facultyWorkspaceRoutes = [
    {
        path: '/faculty/workspace',
        title: 'Faculty Workspace',
        component: <FacultyWorkspace />
    },
    {
        path: '/faculty/exam/:examBatchId',
        title: 'Exam',
        component: <Exam />
    },
    {
        path: '/faculty/exam/:examBatchId/print-attendance',
        title: 'Printout Attendance',
        component: <PrintoutAttendance />
    },
    {
        path: '/faculty/exam/:examBatchId/print-marks',
        title: 'Printout Marks',
        component: <PrintoutMarks />
    },
    {
        path: '/faculty/evaluation/:evaluationId',
        title: 'Evaluation',
        component: <EvaluationPage />
    },
    {
        path: '/faculty/evaluation/bundle/:evaluationBundleId/print-marks',
        title: 'Printout Evaluation Bunlde Marks',
        component: <PrintoutEvaluationBundleMarks />
    }
];

export const studentWorkspaceRoutes = [
    {
        path: '/student/workspace',
        title: 'Student Workspace',
        component: <StudentWorkspace />
    }
]

export const defaultRoutes = [
    {
        path: '/',
        title: "Home",
        component: <Home />
    }
]
