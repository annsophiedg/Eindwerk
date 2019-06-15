<?php

class OrderController
{

    private $dbm;

    public function __construct(DBManager $dbm)
    {
        $this->dbm = $dbm;
    }

    // USER ORDERS --------------------------------------------

    /**
     * ORDER DETAILS OF ORDERED MEAL
     * mls_id
     * mls_name
     * mls_description
     * mls_price
     * mls_take_start
     * mls_take_end
     * mls_date
     * fk_typ_id
     * ord_amount
     *
     * @return string|null
     */
    function getUserOrders($id)
    {
        $sqlUserOrders = "CALL getYourOrderDetails (" . $id . ")";

        //fetch data from db
        $result = $this->dbm->sqlExecute($sqlUserOrders, null, PDO::FETCH_OBJ);

        $userOrders = Array();

        foreach ($result as $i) {
            array_push($userOrders, $i);
        }

        return json_encode($userOrders);
    }


    /**
     * UPDATE YOUR ORDER: WHEN MEAL IS PICKED UP
     * return 1 when UPDATE is done
     *
     * @return boolean
     */
    function finishOrder($mls_id,$usr_id)
    {
        $sqlFinishOrder = "select deliverOrder(" . $mls_id . ",".$usr_id.") as ord_is_delivered";

        //fetch data from db
        $result = $this->dbm->sqlExecute($sqlFinishOrder, null, PDO::FETCH_OBJ);

        return json_encode($result);
    }

    /**
     * RATE YOUR PICKED UP ORDER
     *
     * @return string
     */
    function getOrdersToRate($cons_id)
    {
        $sqlOrdersToRate = "SELECT * FROM users u INNER JOIN orders o ON u.usr_id = o.fk_usr_chef_id INNER JOIN meals m on o.fk_mls_id = m.mls_id WHERE fk_usr_cons_id = ".$cons_id." AND ord_is_delivered = 1 AND fk_rat_id IS NULL ORDER BY mls_date";

        //fetch data from db
        $result = $this->dbm->sqlExecute($sqlOrdersToRate, null, PDO::FETCH_OBJ);

        return json_encode($result);
    }

    /**
     * RATE YOUR PICKED UP ORDER
     *
     * @return string
     */
    function rateOrder($ord_id,$rat_id)
    {
        $sqlRateOrder = "UPDATE orders SET fk_rat_id = ".$rat_id." WHERE ord_id=".$ord_id;

        //fetch data from db
        $result = $this->dbm->sqlExecute($sqlRateOrder, null, PDO::FETCH_OBJ);

        return json_encode($result);
    }



}