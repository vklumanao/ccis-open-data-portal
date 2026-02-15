import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>CCIS Open Data Portal</h4>
          <p>Caraga State University</p>
        </div>
        <div className="footer-section">
          <h4>Powered By</h4>
          <p>
            <a href="https://ckan.org" target="_blank" rel="noreferrer">
              CKAN Data Portal Software
            </a>
          </p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>
            Caraga State University
            <br />
            College of Computer and Information Sciences
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} CCIS Open Data Portal. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
