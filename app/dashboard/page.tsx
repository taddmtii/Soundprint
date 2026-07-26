import StatDisplayCard from "../components/StatDisplayCard";

export default function Dashboard() {
  return (
    <>
      <div className="flex">
        <StatDisplayCard title="Streams" content="34" footer="tracks played" iconPath="..." />
      </div>
    </>
  )
}
