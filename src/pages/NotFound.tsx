import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } 
          {t("not_found.back_home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

