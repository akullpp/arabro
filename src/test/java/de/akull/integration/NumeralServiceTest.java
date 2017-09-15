package de.akull.integration;

import de.akull.service.NumeralService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class NumeralServiceTest {

    @Autowired
    NumeralService numeralService;

    @Test
    public void isPrime_Should_Return_Null_For_Value_Below_1() {

        Boolean result = numeralService.isPrime(0);

        assertThat(result).isNull();
    }

    @Test
    public void isPrime_Should_Return_Null_For_Value_Above_The_Total_Number_Of_Checked_Prime_Numbers() {

        Boolean result = numeralService.isPrime(numeralService.getPrimes().length);

        assertThat(result).isNull();
    }
}
