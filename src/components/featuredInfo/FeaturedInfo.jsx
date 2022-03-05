import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./featuredInfo.css";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);

  // console.log(perc);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Доход</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income[1]?.total}р.</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
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
