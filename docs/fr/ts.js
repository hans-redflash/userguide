function getTransactions(connection, fromDate, toDate) {
  var queryString = 
  "select " +
  "id, externalid, amount, currency, customer_identifier as msisdn, status, transactionid, operatorid, inserted, updated " +
  "from transactions where operatorid in (1,2,6) " +
  "where inserted between '" + fromDate + "' and '" + toDate + "' " +
  "order by id desc;"

  var connection = connect()
  var result = connect.createStatement().executeQuery(queryString);

  var SQLstatement = connection.createStatement();
  var result = SQLstatement.executeQuery(queryString);

  SQLstatement.close();
  conn.close(); 

  return result;  
  }
