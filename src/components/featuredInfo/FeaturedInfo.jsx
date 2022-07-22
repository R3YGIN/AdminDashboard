import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./featuredInfo.css";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState({ curr: 0, prev: 0 });

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data.sort((a, b) => a._id - b._id));
        setPerc({
          curr: (res.data[1].total * 100) / res.data[0].total,
          prev: (res.data[0].total * 100) / res.data[1].total,
        });
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
            %{Math.floor(perc.curr)}
            {perc.prev > perc.curr ? (
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
          <span className="featuredMoney">{income[1]?.total}р.</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc.curr)}
            {perc.prev > perc.curr ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">По сравнению с прошлым месяцем</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">За прошлый месяц</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income[0]?.total}р.</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc.prev)}
            {perc.prev < perc.curr ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">По сравнению с текущим месяцем</span>
      </div>
    </div>
  );
}
