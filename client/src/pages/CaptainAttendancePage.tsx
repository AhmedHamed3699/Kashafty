import { useState } from "react";

import "./CaptainAttendancePage.scss";

import PageTitle from "../components/common/PageTitle";
import TermWeeksDropdown from "../components/molecules/TermWeeksDropdown";
import Button from "../components/common/Button";

import { useCaptainAttendance } from "../hooks/useCaptainAttendance";
import AttendanceInfo from "../components/molecules/AttendanceInfo";
import Table from "../components/molecules/Table";

type Props = {};

const CaptainAttendancePage = (props: Props) => {
  const [chosenWeek, setChosenWeek] = useState("");
  const [termNumber, setTermNumber] = useState("");

  const {
    attendance,
    setAttendance,
    upsertAttendance,
    isLoadingUpsertAttendance,
    isLoading,
    isError,
  } = useCaptainAttendance(chosenWeek, termNumber);

  async function handleSubmit(e) {
    e.preventDefault();
    await upsertAttendance();
  }

  return (
    <div className="captain-attendance-page container">
      <PageTitle title="تسجيل غياب القادة" />
      <form onSubmit={handleSubmit}>
        <TermWeeksDropdown
          setWeek={setChosenWeek}
          setTermNumber={setTermNumber}
          style={{ marginBottom: "2rem" }}
        />
        <Table
          attendanceType="captain"
          attendance={attendance}
          setAttendance={setAttendance}
          isError={isError}
          isLoading={isLoading}
        />
        <AttendanceInfo attendance={attendance} />

        <Button
          disabled={isLoadingUpsertAttendance}
          className="Button--medium Button--success-light"
          type="submit"
        >
          تسليم
        </Button>
        {isLoadingUpsertAttendance && (
          <p
            style={{
              textAlign: "center",
              direction: "rtl",
            }}
          >
            جاري التحميل...
          </p>
        )}
      </form>
    </div>
  );
};

export default CaptainAttendancePage;
