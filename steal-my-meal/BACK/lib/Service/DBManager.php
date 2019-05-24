<?php
class DBManager
{
    private $configuration;
    private $pdo;

    public function __construct($configuration)
    {
        $this->configuration = $configuration;
        $this->pdo = $this->getPDO();
    }

    /**
     * @return PDO
     */
    public function getPDO()
    {
        if ($this->pdo === null) {
            $this->pdo = new PDO(
                $this->configuration['db_dsn'],
                $this->configuration['db_user'],
                $this->configuration['db_pass']
            );

            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
        }

        return $this->pdo;
    }

    /**
     * @param string $prepare_sql
     * @param array $params
     * @return
     */
    public function sqlExecute( $sql, array $params = null, $mode = PDO::FETCH_ASSOC )
    {
        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        $result = "";

        if ( $statement->errorCode() > 0 )
        {
            print "DBManager: Error in SQL: $sql";
        }
        else
        {
            $result = $statement->fetchAll($mode);
        }

        return $result;
    }

}