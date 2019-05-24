<?php

class Container {

    private $configuration;
    private $dbManager;

    public function __construct(array $configuration)
    { 
        $this->configuration=$configuration;
    }

    /**
     * @return DBManager
     */
    public function getDBManager()
    {
        if ($this->dbManager === null)
        {
            $this->dbManager = new DBManager($this->configuration);
        }

        return $this->dbManager;
    }

}

?>