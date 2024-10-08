import AttendanceRateChip from "../molecules/stat.attendance.rate";
import AttendanceLineChart from "../molecules/stat.attendance.line";
import AttendanceStackedChart from "../molecules/stat.attendance.stackedchart";
import ScoutAttendanceByName from "../molecules/stat.attendance.scouts";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

type AttendanceStatSectionProps = {};

const AttendanceStatSection: React.FC = ({}: AttendanceStatSectionProps) => {
  const userInfo = useAuthUser();

  return (
    <div>
      <h4>الغياب</h4>
      <div className="info-section" style={{ gridTemplateRows: "1fr" }}>
        <AttendanceRateChip label="نسبة حضور المجموعة" />
        {userInfo.type == "unit" ? (
          <AttendanceRateChip
            label="نسبة حضور الوحدة"
            unitCaptainId={userInfo.captainId}
          />
        ) : userInfo.type == "regular" ? (
          <AttendanceRateChip
            label="نسبة حضور القطاع"
            sectorBaseName={userInfo.rSectorBaseName}
            sectorSuffixName={userInfo.rSectorSuffixName}
          />
        ) : (
          ""
        )}
      </div>
      <div>
        <h6
          style={{
            marginBottom: "2rem",
          }}
        >
          مخطط نسبة الحضور
        </h6>
        <AttendanceLineChart
          id="attendanceLineChartAll"
          label="نسبة غياب المجموعة خلال الفترة"
        />

        {userInfo.type === "regular" ? (
          <AttendanceLineChart
            id="attendanceLineChartSector"
            label="نسبة حضور القطاع خلال الفترة"
            sectorBaseName={userInfo.rSectorBaseName}
            sectorSuffixName={userInfo.rSectorSuffixName}
          />
        ) : userInfo.type === "unit" ? (
          <AttendanceLineChart
            id="attendanceLineChartUnit"
            label="نسبة غياب الوحدة خلال الفترة"
            unitCaptainId={userInfo.captainId}
          />
        ) : (
          ""
        )}
      </div>
      <div>
        <AttendanceStackedChart label="نسبة فياب القطاعات" />
      </div>
      <div>
        <h6
          style={{
            marginBottom: "2rem",
          }}
        >
          البحث عن كشاف
        </h6>
        <ScoutAttendanceByName />
      </div>
    </div>
  );
};

export default AttendanceStatSection;
