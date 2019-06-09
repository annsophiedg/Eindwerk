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



}