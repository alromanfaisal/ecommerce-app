import pageStyles from "./page.module.css";
export default function Page() {
  return (
    <div className={pageStyles.main}>
      <p className={pageStyles.text}>Hi! This is running project...</p>
    </div>
  );
}