import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import "./featuredInfo.css";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Доход</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">5000р.</span>
          <span className="featuredMoneyRate">
            -13.7 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">По сравнению с прошлым месяцем</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Продажи</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">10000р.</span>
          <span className="featuredMoneyRate">
            -5.7 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">По сравнению с прошлым месяцем</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Стоимость</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">5350р.</span>
          <span className="featuredMoneyRate">
            +3.7 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">По сравнению с прошлым месяцем</span>
      </div>
    </div>
  );
}
