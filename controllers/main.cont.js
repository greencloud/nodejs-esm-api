
export const MainView = (req, res) => {
  const title = "Home page";
  res.render('main', { title });
}